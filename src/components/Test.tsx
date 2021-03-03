import { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import SignatureCanvas from 'react-signature-canvas';
import Tesseract, { recognize } from 'tesseract.js';
// import * as worker from 'tesseract.js/dist/worker.min';

// Components
import TestPagination from './TestPagination';
import Canvas from './Canvas';
import Button from './Button';

// Types
import Test from '../types/Test';

type MatchParams = {
    id?: string | undefined;
    page?: string | undefined;
}

const TestComponent = ({ match, history }: RouteComponentProps<MatchParams>) => {
    const { params: { id, page: initPage } } = match;
    const page: number = initPage ? parseInt(initPage) : 1;
    const iQuestion: number = page - 1;

    // States
    const [canvasRef, setCanvasRef] = useState<SignatureCanvas | null>(null);
    const [test, setTest] = useState<Test | null>(null);
    const [isChecking, setIsChecking] = useState<boolean>(false);

    // Effect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}tests/${id}`)
            .then((res: AxiosResponse<any>) => setTest(res.data))
            .catch((err: any) => console.log(err));
    }, [id]);

    // Functions
    const check = () => {
        setIsChecking(true);

        if (canvasRef) {
            recognize(canvasRef.toDataURL(), undefined, {
                workerPath: '/workers/tesseract.js/worker.min.js',
                workerBlobURL: false,
              })
                .then(({ data: { text: initText } }: Tesseract.RecognizeResult) => {
                    const text = initText.trim();

                    alert(`(This alert just demo and just temporary) \n\n Question: ${test?.attempted_test_questions[iQuestion].test_question.question} \n Answer: ${text} \n Is Corrent? \n ${text === test?.attempted_test_questions[iQuestion].test_question.question}`);

                    setIsChecking(false);                       // Set checking status to false
                    canvasRef.clear()                           // Clear canvas

                    if (test && page + 1 <= test?.question_count) {
                        history.push(`/tests/${id}/${page + 1}`);   // Navigate to next page
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    // const answer = () => {
    //     // ...
    // }

    return (
        <div className="flex flex-col flex-grow bg-blue-100 w-screen">
            <TestPagination active={page} count={test?.question_count} />

            <div className="flex flex-col flex-grow px-3">
                <div className="flex flex-col flex-grow justify-center items-center w-full">
                    <span className="flex justify-center items-center bg-white w-32 h-32 text-7xl font-extrabold mb-6 rounded-xl shadow-sm">
                        {test ? test?.attempted_test_questions[iQuestion].test_question.question : "?"}
                    </span>
                    <p className="text-blue-900 text-center font-semibold">
                        Tulislah huruf <strong className="font-bold">{test ? test?.attempted_test_questions[iQuestion].test_question.question : "?"}</strong> dengan <strong className="font-bold">Kanvas</strong> <br />dibawah ini.
                    </p>
                </div>

                <div className="mb-3">
                    <Canvas
                        bgColor="blue-200"
                        bgColorOn="transparent" // Change this
                        textColor="blue-900"
                        h={72}
                        canvasRef={canvasRef}
                        setCanvasRef={setCanvasRef}
                    />
                </div>

                <div className="mb-3">
                    {isChecking ? (
                        <button className="bg-gray-200 text-gray-500 font-extrabold w-full h-12 rounded-full" disabled>
                            Loading...
                        </button>
                    ) : (
                        <Button
                            {...canvasRef ?
                                { onClick: () => check() }
                                : { disabled: true, }
                            }
                            w="full"
                            h={12}
                            borderR="full"
                        >
                            Jawab
                        </Button>
                    )}
                </div>
            </div>
        </div>

    )
};

export default withRouter(TestComponent);