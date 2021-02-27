import { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { IconType } from 'react-icons';
import { FaTrash, FaEraser, FaPen } from 'react-icons/fa';

// Components
import Button from './Button';

type Props = {
    canvasRef: SignatureCanvas | null,
    setCanvasRef: React.Dispatch<React.SetStateAction<SignatureCanvas | null>>,
    recognize: (image: string) => Promise<void>,
};

type CanvasTool = {
    onClick: () => void,
    icon: any,
    isActivable: boolean,
};

const Canvas = ({ canvasRef, setCanvasRef }: Props) => {
    const [penColor, setPenColor] = useState<'black' | 'white'>('black');
    const [activeToolKey, setActiveToolKey] = useState<number>(2);
    const tools: CanvasTool[] = [
        {
            onClick: () => canvasRef?.clear(),
            icon: (<FaTrash color="inherit" size="1rem" />),
            isActivable: false,
        },
        {
            onClick: () => setPenColor('white'),
            icon: (<FaEraser color="inherit" size="1rem" />),
            isActivable: true,
        },
        {
            onClick: () => setPenColor('black'),
            icon: (<FaPen color="inherit" size="1rem" />),
            isActivable: true,
        },
    ];

    return (
        <div className="flex flex-col bg-white h-full rounded-lg overflow-hidden">
            <div className="flex justify-end items-center bg-green-400 p-1.5">
                <strong className="text-white ml-3 mr-auto">Kanvas</strong>

                {tools.map((tool, key) => (
                    <span className="ml-1.5" key={Math.random()}>
                        <Button
                            // {...canvasRef ?
                            //     { onClick: () => {
                            //         tool.onClick();

                            //         if(tool.isActivable) {
                            //             console.log(key);
                            //             setActiveToolKey(key);
                            //         }
                            //     }, }
                            //     : { disabled: true, }
                            // }
                            w={10}
                            h={10}
                            bgColor={key === activeToolKey ? 'green-500' : 'transparent'}
                            bgColorOn="green-500"
                            textColor="white"
                            borderW="none"
                            borderR="lg"
                            center={true}
                            onClick={() => {
                                tool.onClick();

                                if (tool.isActivable) {
                                    console.log(key);
                                    setActiveToolKey(key);
                                }

                            }}
                        >
                            {tool.icon}
                        </Button>
                    </span>
                ))}
            </div>

            <div className="flex-grow">
                <SignatureCanvas
                    penColor={penColor}
                    minWidth={6}
                    maxWidth={6}
                    canvasProps={{ className: 'sigCanvas w-full h-full' }}
                    ref={(ref) => setCanvasRef(ref)}
                />
            </div>
        </div>
    )
};

export default Canvas;
