import { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
// import { IconType } from 'react-icons';
import { FaTrash, FaEraser, FaPen } from 'react-icons/fa';

// Components
import Button from './Button';

type Props = {
    bgColor?: string,
    btnBgColorOn?: string,
    textColor?: string,
    btnTextColorOn?: string,
    btnShadow?: string,
    h: number,
    canvasRef: SignatureCanvas | null,
    setCanvasRef: React.Dispatch<React.SetStateAction<SignatureCanvas | null>>,
};

type CanvasTool = {
    onClick: () => void,
    icon: any,
    isActivable: boolean,
};

const Canvas = ({ 
    bgColor = 'white', 
    textColor = 'blue-900', 
    btnBgColorOn = 'blue-50', 
    btnTextColorOn = 'blue-900', 
    btnShadow = 'none', 
    h, 
    canvasRef, 
    setCanvasRef 
}: Props) => {
    const [penColor, setPenColor] = useState<'black' | 'white'>('black');
    const [activeToolKey, setActiveToolKey] = useState<number>(2);
    const tools: CanvasTool[] = [
        {
            onClick: () => canvasRef?.clear(),
            icon: (<FaTrash color="inherit" size="0.83rem" />),
            isActivable: false,
        },
        {
            onClick: () => setPenColor('white'),
            icon: (<FaEraser color="inherit" size="0.83rem" />),
            isActivable: true,
        },
        {
            onClick: () => setPenColor('black'),
            icon: (<FaPen color="inherit" size="0.83rem" />),
            isActivable: true,
        },
    ];

    return (
        <div className={`flex flex-col bg-white h-${h} rounded-lg shadow-default overflow-hidden`}>
            <div className={`flex justify-end items-center bg-${bgColor} p-2 border-b-3 border-blue-50`}>
                <strong className={`text-${textColor} text-sm ml-3 mr-auto`}>Kanvas</strong>

                {tools.map((tool, key) => (
                    <span key={Math.random()}>
                        <Button
                            w={11}
                            h={11}
                            bgColor={key === activeToolKey ? btnBgColorOn : 'transparent'}
                            bgColorOn={btnBgColorOn}
                            textColor={key === activeToolKey ? btnTextColorOn : textColor}
                            textColorOn={btnTextColorOn}
                            borderR="md"
                            center={true}
                            shadow={key === activeToolKey ? btnShadow : 'none'}
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
