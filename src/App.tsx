import { useState } from 'react';
import Tesseract, { createWorker } from 'tesseract.js';
import SignatureCanvas from 'react-signature-canvas'

// Components
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
        logger: (m: WorkerLog) => console.log(m)
    });

    const recognize = async (image: string) => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } }: Tesseract.RecognizeResult = await worker.recognize(image);

        console.log(text);
        setResultText(text);

        await worker.terminate();
    };

    return (
        <div className="App">
            <div className="flex flex-col h-screen">
                <div className="flex flex-grow justify-center items-center w-full">
                    <span className="text-8xl font-extrabold">
                        Aa
                    </span>
                </div>

                <div className="flex-none h-1/2 px-3">
                    <div className="h-full border-black border-2 rounded-xl">
                        <SignatureCanvas
                            penColor='red'
                            minWidth={8}
                            maxWidth={8}
                            canvasProps={{ className: 'sigCanvas w-full h-full' }}
                            ref={(ref) => setCanvasRef(ref)}
                        />
                    </div>
                </div>

                <div className="flex p-3">
                    <OutlineButton
                        {...canvasRef ?
                            { onClick: () => recognize(canvasRef.toDataURL()), }
                            : { disabled: true, }
                        }
                        width={16}
                        height={16}
                        borderWidth="none"
                        borderRadius="full"
                        onClick={() => canvasRef?.clear()}
                    >
                        OK
                    </OutlineButton>
                    <div className="flex-grow">
                        <Button
                            {...canvasRef ?
                                { onClick: () => recognize(canvasRef.toDataURL() /* Convert canvas content to data URL */), }
                                : { disabled: true, }
                            }
                            width="full"
                            height={16}
                            borderRadius="full"
                        >
                            Recognize
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
