import SignatureCanvas from 'react-signature-canvas'

// Components
import Canvas from './Canvas';
import Button from './Button';

type Props = {
    recognize: (image: string) => Promise<void>,
    canvasRef: SignatureCanvas | null,
    setCanvasRef: React.Dispatch<React.SetStateAction<SignatureCanvas | null>>,
}

const TestProgress = () => {
    return (
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
    );
}

const Test = ({recognize, canvasRef, setCanvasRef}: Props) => {
    return (
        <div className="flex flex-col flex-grow bg-green-500 w-screen">
            <TestProgress  />

            <div className="flex flex-col flex-grow px-3">
                <div className="flex flex-col flex-grow justify-center items-center w-full">
                    <span className="flex justify-center items-center bg-white w-32 h-32 text-7xl font-extrabold mb-6 rounded-xl">
                        A
                        </span>
                    <p className="text-white text-center">Tulislah huruf <strong>A</strong> dengan <strong>Kanvas</strong> <br />dibawah ini.</p>
                </div>

                <div className="mb-3">
                    <Canvas
                        h={72}
                        canvasRef={canvasRef}
                        setCanvasRef={setCanvasRef}
                    />
                </div>

                <div className="mb-3">
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
            </div>
        </div>

    )
};

export default Test;