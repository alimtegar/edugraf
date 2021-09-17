import { useState, } from 'react';
import SignatureCanvas from 'react-signature-canvas';
// import Tesseract, { recognize } from 'tesseract.js';
import axios from 'axios';
import { FaVolumeUp } from 'react-icons/fa';

// Utils
import { base64toBlob, recognize, translateStageCategory } from '../Utils';

// Contexts
import { useCharacterContext } from '../contexts/CharacterContext';

// Components
// import Navbar from './Navbar';
import CharacterFrame from './CharacterFrame';
// import Stepper from './Stepper';
import Canvas from './Canvas';
import Button from './Button';
import LoadingButton from './LoadingButton';

// Types
import AttemptedQuestion from '../types/AttemptedQuestion';

type Props = {
    attemptedQuestion: AttemptedQuestion,
    next: () => void,
}

const AttemptedQuestionOnCanvas = ({ attemptedQuestion, next }: Props) => {
    // Context
    const characterContext = useCharacterContext();

    // States
    const [canvasRef, setCanvasRef] = useState<SignatureCanvas | null>(null);
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [isListeningPronounciation, setIsListeningPronounciation] = useState<boolean>(false);;

    // Functions
    const check = () => {
        setIsChecking(true);

        if (canvasRef) {
            const srcImg = base64toBlob(canvasRef.toDataURL(), 'image/png');

            recognize(srcImg)
                .then((res) => answer(res))
                .catch((err) => console.error(err));
        }
    };

    const answer = (answer: string) => {
        axios.put(`${process.env.REACT_APP_API_URL}/attempted-questions/${attemptedQuestion?.id}`, {
            answer: answer,
        })
            .then(() => {
                setIsChecking(false);
                next();

                canvasRef?.clear()
            })
            .catch((err) => {
                setIsChecking(false);
                console.error(err);
            });
    }

    return (
        <>
            <section className="flex flex-col justify-center items-center w-full p-10">
                <div className="relative">
                    <CharacterFrame size={28} textSize="6xl" rounded="xl">
                        {attemptedQuestion ? attemptedQuestion?.question.question : ''}
                    </CharacterFrame>
                    <span className="absolute right-0 bottom-0 transform translate-x-1/3 translate-y-1/3">
                        <Button
                            w={11}
                            h={11}
                            borderR="full"
                            shadow="default"
                            center
                            isPing={isListeningPronounciation}
                            onClick={() => characterContext.listenPronounciation(attemptedQuestion?.question.question, setIsListeningPronounciation)}
                        >
                            <FaVolumeUp size="1rem" />
                        </Button>
                    </span>
                </div>
                <p className="text-gray-700 text-center text-sm mt-10 font-semibold leading-none">
                    {/* Tulislah (character category)... */}
                    Tulislah {translateStageCategory(attemptedQuestion.attempted_stage.stage.category).toLowerCase()} <strong className="font-bold">"{attemptedQuestion ? attemptedQuestion?.question.question : ''}"</strong> dengan <strong className="font-bold">Kanvas</strong>.
                    </p>
            </section>

            <section className="flex flex-grow px-4 mb-4 md:mx-auto md:w-1/3">
                <Canvas
                    canvasRef={canvasRef}
                    setCanvasRef={setCanvasRef}
                />
            </section>

            <section className="mt-auto px-4 mb-4 md:mx-auto md:w-1/3">
                {isChecking ? (
                    <LoadingButton shadow="default" />
                ) : (
                    <Button
                        {...canvasRef ?
                            { onClick: () => check() }
                            : { disabled: true, }
                        }
                        shadow="default"
                    >
                        Kirim Jawaban
                    </Button>
                )}
            </section>
        </>
    )
};



export default AttemptedQuestionOnCanvas;