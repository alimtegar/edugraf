import { useState } from 'react';
import Tesseract, { createWorker } from 'tesseract.js';
import SignatureCanvas from 'react-signature-canvas'

type WorkerLog = {
    workerId: string,
    jobId?: string,
    status?: string,
    progress: number,
};

const App = () => {
    // Refs
    const [canvasRef, setCanvasRef] = useState<SignatureCanvas | null>(null);
    const [resultText, setResultText] = useState<string>('');

    const worker = createWorker({
        logger: (m: WorkerLog) => console.log(m)
    });

    const recognize = async (imgUrl: string) => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } }: Tesseract.RecognizeResult = await worker.recognize(imgUrl);

        console.log(text);
        setResultText(text);

        await worker.terminate();
    };

    return (
        <div className="App">
            <SignatureCanvas
                penColor='green'
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                ref={(ref) => setCanvasRef(ref)}
            />

            {/* {canvasRef && canvasRef.toDataURL()} */}

            {/* {() => recognize(canvasRef.toDataURL())} */}
            <button {...canvasRef ? { onClick: () => recognize(canvasRef.toDataURL()), } : { disabled: true, }} >
                recognize
            </button>

            <textarea value={resultText} /> 
        </div>
    );
}

export default App;
