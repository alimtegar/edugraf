import { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
// import { IconType } from 'react-icons';
import { FaTrash, FaEraser, FaPen } from 'react-icons/fa';

// Components
import Button from './Button';

type Props = {
    bgColor?: string,
    bgColorOn?: string,
    textColor?: string,
    h: number,
    canvasRef: SignatureCanvas | null,
    setCanvasRef: React.Dispatch<React.SetStateAction<SignatureCanvas | null>>,
};

type CanvasTool = {
    onClick: () => void,
    icon: any,
    isActivable: boolean,
};

const Canvas = ({ bgColor = 'white', bgColorOn = 'gray-300', textColor = 'bleck', h, canvasRef, setCanvasRef }: Props) => {
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
        <div className={`flex flex-col bg-white h-${h} rounded-lg shadow-sm overflow-hidden`}>
            <div className={`flex justify-end items-center bg-${bgColor} p-1.5`}>
                <strong className={`text-${textColor} ml-3 mr-auto`}>Kanvas</strong>

                {tools.map((tool, key) => (
                    <span className="ml-1.5" key={Math.random()}>
                        <Button
                            w={10}
                            h={10}
                            bgColor={key === activeToolKey ? bgColorOn : 'transparent'}
                            bgColorOn={bgColorOn}
                            textColor={textColor}
                            borderR="lg"
                            center={true}
                            onClick={() => {
                                tool.onClick();

                                if (tool.isActivable) {
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
