import { useState, useCallback, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import SignatureCanvas from 'react-signature-canvas';
import Tesseract, { recognize } from 'tesseract.js';
import { FaVolumeUp } from 'react-icons/fa';

// Contexts
import { useCharacterContext } from '../contexts/CharacterContext';

// Components
import Navbar from './Navbar';
import CharacterFrame from './CharacterFrame';
import Stepper from './Stepper';
import Canvas from './Canvas';
import Button from './Button';

// Types
import { default as AttemptedQuestionState } from '../types/AttemptedQuestion';
import LoadingButton from './LoadingButton';

type MatchParams = {
    attemptedStageId?: string | undefined;
    n?: string | undefined;
}

const AttemptedQuestion = ({ match, history }: RouteComponentProps<MatchParams>) => {
    const { params: { attemptedStageId, n: initN } } = match;
    const n: number = initN ? parseInt(initN) : 1;

    // Context
    const characterContext = useCharacterContext();

    // States
    const [canvasRef, setCanvasRef] = useState<SignatureCanvas | null>(null);
    const [attemptedQuestion, setAttemptedQuestion] = useState<AttemptedQuestionState | null>(null);
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [isListeningPronounciation, setIsListeningPronounciation] = useState<boolean>(false);;

    // Functions
    const check = () => {
        setIsChecking(true);

        if (canvasRef) {
            recognize(canvasRef.toDataURL(), undefined, {
                workerPath: '/workers/tesseract.js/worker.min.js',
                workerBlobURL: false,
            })
                .then(({ data: { text } }: Tesseract.RecognizeResult) => answer(text.trim()))
                .catch((err) => console.log(err));
        }
    };

    const answer = (answer: string) => {
        axios.put(`${process.env.REACT_APP_API_URL}/attempted-questions/${attemptedQuestion?.id}`, {
            answer: answer,
        })
            .then(() => {
                setIsChecking(false);
                next(!!(attemptedQuestion && n + 1 <= attemptedQuestion?.attempted_stage.attempted_questions.length), n + 1);

                canvasRef?.clear()
            })
            .catch((err) => {
                setIsChecking(false);
                console.error(err);
            });
    }

    const next = useCallback((condition: boolean, nextN: number) => {
        const nextPath = condition
            ? `/attempted-stages/${attemptedStageId}/attempted-questions/n/${nextN}`
            : `/attempted-stages/${attemptedStageId}`;

        history.push(nextPath);
    }, [history, attemptedStageId]);

    // Effect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/attempted-stages/${attemptedStageId}/attempted-questions/n/${n}`)
            .then((res) => {
                const initAttemptedQuestion: AttemptedQuestionState = res.data;

                // If attempted question is answered
                if (initAttemptedQuestion.answer) {
                    // Get number from other unanswered attempted questions
                    const unansweredOtherN = initAttemptedQuestion.attempted_stage.attempted_questions.findIndex((other) => !other.answer) + 1;

                    next(!!(unansweredOtherN), unansweredOtherN);
                } else {
                    setAttemptedQuestion(initAttemptedQuestion);
                }
            })
            .catch((err) => {
                console.error(err);
                history.push('/404');
            });
    }, [history, next, attemptedStageId, n]);

    return (
        <>
            <Navbar />

            <main className="flex flex-grow flex-col justify-between pt-15">
                <Stepper active={n} count={attemptedQuestion?.attempted_stage.attempted_questions.length} />

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
                                <FaVolumeUp size="0.83rem" />
                            </Button>
                        </span>
                    </div>
                    <p className="text-white text-center text-sm mt-8 font-semibold leading-none">
                        Tulislah huruf <strong className="font-bold">{attemptedQuestion ? attemptedQuestion?.question.question : ''}</strong> dengan <strong className="font-bold">Kanvas</strong>.
                    </p>
                </section>

                <section className="mt-auto px-4 pb-4">
                    <div className="mb-4">
                        <Canvas

                            h={64}
                            canvasRef={canvasRef}
                            setCanvasRef={setCanvasRef}
                        />
                    </div>
                    <div>
                        {isChecking ? (
                            <LoadingButton />
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
                    </div>
                </section>
            </main>
        </>
    )
};



export default withRouter(AttemptedQuestion);