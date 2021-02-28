import { useState } from 'react';
import Tesseract, { createWorker } from 'tesseract.js';
import SignatureCanvas from 'react-signature-canvas'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

// Components
import Navbar from './components/Navbar';
import Test from './components/Test';

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
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <Switch>
                    <Route path="/tests">
                        <Test recognize={recognize} canvasRef={canvasRef} setCanvasRef={setCanvasRef} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
