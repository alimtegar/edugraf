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
    canvasRef: SignatureCanvas | null,
    setCanvasRef: React.Dispatch<React.SetStateAction<SignatureCanvas | null>>,
};

type CanvasTool = {
    onClick: () => void,
    icon: any,
    isActivable: boolean,
};

const Canvas = ({
    bgColor = 'transparent',
    textColor = 'gray-400',
    btnBgColorOn = 'blue-50',
    btnTextColorOn = 'blue-500',
    btnShadow = 'none',
    canvasRef,
    setCanvasRef
}: Props) => {
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
        <div className={`flex flex-col bg-white flex-grow rounded-xl shadow-default overflow-hidden`}>
            <div className={`flex justify-end items-center bg-${bgColor} p-2`}>
                <strong className={`text-gray-700 text-sm ml-3 mr-auto`}>Kanvas</strong>

                {tools.map((tool, key) => (
                    <span className="mx-1" key={key}>
                        <Button
                            w={12}
                            h={12}
                            bgColor={key === activeToolKey ? btnBgColorOn : 'transparent'}
                            bgColorOn={btnBgColorOn}
                            textColor={key === activeToolKey ? btnTextColorOn : textColor}
                            textColorOn={btnTextColorOn}
                            borderR="full"
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

            <div className="relative flex-grow">
                <SignatureCanvas
                    penColor={penColor}
                    minWidth={6}
                    maxWidth={6}
                    canvasProps={{ className: 'sigCanvas relative z-10 w-full h-full' }}
                    ref={(ref) => setCanvasRef(ref)}
                />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => (
                    <div 
                    className={`absolute left-0 bg-gray-300 w-full h-0.5`} 
                    style={{
                        top: `${v * 10}%`,
                    }}
                    key={v} 
                />
                ))}
            </div>
        </div>
    )
};

export default Canvas;
