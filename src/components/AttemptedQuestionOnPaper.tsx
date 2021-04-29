import { useState, useRef, useCallback, useEffect, } from 'react';
import Tesseract, { recognize } from 'tesseract.js';
import { FaVolumeUp, } from 'react-icons/fa';
import Webcam from "react-webcam";
import axios from 'axios';

// Contexts
import { useCharacterContext } from '../contexts/CharacterContext';

// Components
import CharacterFrame from './CharacterFrame';
import Button from './Button';
import IconButton from './IconButton';
import LoadingButton from './LoadingButton';

// Types
import AttemptedQuestion from '../types/AttemptedQuestion';

type Props = {
    attemptedQuestion: AttemptedQuestion,
    next: () => void,
}

const LoadingCamera = () => (
    <div className="flex justify-center items-center w-full h-full text-gray-400">
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const AttemptedQuestionOnPaper = ({ attemptedQuestion, next }: Props) => {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'environment',
    };

    // Refs
    const webcamRef = useRef<Webcam | null>(null);

    // Context
    const characterContext = useCharacterContext();

    // States
    const [imageSrc, setImageSrc] = useState<string | null | undefined>(null)
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [isListeningPronounciation, setIsListeningPronounciation] = useState<boolean>(false);;

    // Effects
    useEffect(() => {
        // componentWillUnmount
        return () => {
            // Clean up
            setIsChecking(false); 
        }
    }, []);

    // Functions
    const answer = useCallback((answer: string) => {
        axios.put(`${process.env.REACT_APP_API_URL}/attempted-questions/${attemptedQuestion?.id}`, {
            answer: answer,
        })
            .then(() => {
                setIsChecking(false);
                next();

                setImageSrc(null);
            })
            .catch((err) => {
                setIsChecking(false);
                console.error(err);
            });
    }, [attemptedQuestion.id, next]);

    const capture = useCallback(() => {
        setIsChecking(true);

        const imageSrc = webcamRef.current?.getScreenshot();

        setImageSrc(imageSrc);

        if (imageSrc) {
            recognize(imageSrc, undefined, {
                workerPath: `/workers/tesseract.js/worker.min.js`,
                workerBlobURL: false,
            })
                .then(({ data: { text } }: Tesseract.RecognizeResult) => answer(text.trim()))
                .catch((err) => console.log(err));
        }
    }, [webcamRef, answer]);

    return (
        <>
            <section className="flex w-full justify-center items-center py-10">
                <CharacterFrame
                    size={11}
                    p={4}
                    textSize="xl"
                    rounded="lg"
                    aspect={false}
                >
                    {attemptedQuestion ? attemptedQuestion?.question.question : ''}
                </CharacterFrame>
            </section>

            <section className="px-16 mb-10">
                <p className="text-white text-center text-sm font-semibold leading-snug">
                    Tulislah kata <strong className="font-bold">{attemptedQuestion ? attemptedQuestion?.question.question : ''}</strong> lalu fotolah.
                </p>
            </section>

            <section className="grid px-4 mb-4 md:mx-auto md:w-1/3">
                <IconButton
                    icon={<FaVolumeUp size="0.83rem" />}
                    title="Dengarkan Pengucapan"
                    isPing={isListeningPronounciation}
                    onClick={() => characterContext.listenPronounciation(attemptedQuestion?.question.question, setIsListeningPronounciation)}
                />
            </section>

            <section className="flex flex-grow px-4 mb-4 md:mx-auto md:w-1/3">
                <div className="relative flex-grow bg-gray-200 rounded-xl overflow-hidden">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt="Foto Jawaban"
                            className="absolute z-10 inset-0 object-cover w-full h-full"
                        />
                    ) : (
                        <Webcam
                            audio={false}
                            screenshotFormat="image/jpeg"
                            width={1280}
                            videoConstraints={videoConstraints}
                            ref={webcamRef}
                            className="absolute z-10 inset-0 object-cover w-full h-full"
                        />
                    )}

                    <LoadingCamera />
                </div>

            </section>

            <section className="mt-auto px-4 mb-4 md:mx-auto md:w-1/3">
                {isChecking ? (
                    <LoadingButton />
                ) : (
                    <Button
                        {...webcamRef ?
                            { onClick: () => capture() }
                            : { disabled: true, }
                        }
                        center
                    >
                        Foto Jawaban
                    </Button>
                )}
            </section>
        </>
    )
};



export default AttemptedQuestionOnPaper;