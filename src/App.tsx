import { useState } from 'react';
import Tesseract, { createWorker } from 'tesseract.js';
import SignatureCanvas from 'react-signature-canvas'
import { FaTrash, FaArrowLeft } from 'react-icons/fa';

// Components
import Navbar from './components/Navbar';
import Canvas from './components/Canvas';
import Button from './components/Button';
import OutlineButton from './components/OutlineButton';

type WorkerLog = {
    workerId: string,
    jobId?: string,
    status?: string,
    progress: number,
};

const App = () => {
    // Refs
    const [canvasRef, setCanvasRef] = useState<SignatureCanvas | null>(null);
    const [resultText, setResultText] = useState<string>('???');

    const worker = createWorker({
        // logger: (m: WorkerLog) => console.log(m)
    });

    const recognize = async (image: string) => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } }: Tesseract.RecognizeResult = await worker.recognize(image);

        alert(`(This alert just demo and just temporary) \n\n Question: A \n Answer: ${text} \n Is Corrent? \n ${text.trim() === 'A'}`);
        setResultText(text);

        await worker.terminate();
    };

    return (
        <div className="App">
            <div className="flex flex-col bg-green-500 w-screen h-screen">
                <Navbar />
                <div>
                    <ol className="flex grid grid-cols-5">
                        <li className="bg-red-500 h-0.75"></li>
                        <li className="relative bg-red-500 border-red-500 h-0.75">
                        {/* <span className="absolute top-0.75 left-1/2 transform -translate-x-1/2 border-transparent border-12" style={{ borderTopColor: 'inherit', }}></span> */}
                        <span className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-red-500 w-3 h-3 rounded-full" style={{ borderTopColor: 'inherit', }}></span>
                        </li>
                        <li className="bg-white h-0.75"></li>
                        <li className="bg-white h-0.75"></li>
                        <li className="bg-white h-0.75"></li>
                    </ol>
                </div>

                <div className="flex flex-col flex-grow justify-center items-center w-full">
                    <span className="flex justify-center items-center bg-white w-32 h-32 text-7xl font-extrabold mb-6 rounded-xl">
                        A
                    </span>
                    <p className="text-white text-center">Tulislah huruf <strong>A</strong> dengan <strong>Kanvas</strong> <br/>dibawah ini.</p>
                </div>

                <div className="flex-none h-2/5 px-3">
                    <Canvas 
                        canvasRef={canvasRef}
                        setCanvasRef={setCanvasRef} 
                        recognize={recognize} 
                    />
                </div>

                <div className="flex p-3">
                    <div className="flex-grow">
                        <Button
                            {...canvasRef ?
                                { onClick: () => recognize(canvasRef.toDataURL() /* Convert canvas content to data URL */), }
                                : { disabled: true, }
                            }
                            w="full"
                            h={12}
                            borderR="full"
                        >
                            Submit
                    </Button>
                    </div>
                    {/* <OutlineButton
                        {...canvasRef ?
                            { onClick: () => recognize(canvasRef.toDataURL()), }
                            : { disabled: true, }
                        }
                        w="1/3"
                        h={12}
                        rounded="none"
                        onClick={() => canvasRef?.clear()}
                    >
                        Erase
                    </OutlineButton> */}
                </div>

                {/* <div className="mb-6">
                    <div className="flex justify-center items-center bg-green-100 w-full border-green-300 border-2 rounded-lg">
                        <span>
                            {resultText}
                        </span>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default App;
