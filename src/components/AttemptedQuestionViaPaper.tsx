import { useState, useRef, useCallback, } from 'react';
import { RouteComponentProps, } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import Tesseract, { recognize } from 'tesseract.js';
import { FaChevronLeft, FaVolumeUp, FaCamera } from 'react-icons/fa';
import Webcam from "react-webcam";

// Contexts
import { useCharacterContext } from '../contexts/CharacterContext';

// Components
import Navbar from './Navbar';
import CharacterFrame from './CharacterFrame';
import Stepper from './Stepper';
import Canvas from './Canvas';
import Button from './Button';
import IconButton from './IconButton';
import Alert from './Alert';

// Types
import LoadingButton from './LoadingButton';

type MatchParams = {
    category?: string | undefined;
    character?: string | undefined;
}

const AttemptedQuestionViaPaper = ({ match, history, }: RouteComponentProps<MatchParams>) => {
    const { params: { category, character } } = match;
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'environment',
    };

    // Refs
    const webcamRef = useRef<Webcam | null>(null);

    // Context
    const characterContext = useCharacterContext();

    // States
    const [canvasRef, setCanvasRef] = useState<SignatureCanvas | null>(null);
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [isListeningPronounciation, setIsListeningPronounciation] = useState<boolean>(false);;

    // Functions
    const check = () => {
        setIsChecking(true);

        if (canvasRef) {
            recognize(canvasRef.toDataURL(), undefined, {
                workerPath: '/workers/tesseract.js/worker.min.js',
                workerBlobURL: false,
            })
                .then(({ data: { text } }: Tesseract.RecognizeResult) => answer(text.trim()))
                .catch((err) => console.log(err));
        }
    };

    const answer = (answer: string) => {
        setIsChecking(false);
        canvasRef?.clear();

        if (answer === character) {
            Alert.fire({
                title: (<span className="text-lg text-gray-900 font-bold leading-snug">Benar</span>),
                html: (<p className="text-sm text-gray-500 font-semibold">Jawaban Anda (<strong className="font-bold">{answer}</strong>) sama dengan pertanyaan (<strong className="font-bold">{character}</strong>).</p>),
                icon: 'success',
                confirmButtonText: 'Baik',
            }).then(({ isConfirmed }) => {
                if (isConfirmed) {

                }
            });
        } else {
            Alert.fire({
                title: (<span className="text-lg text-gray-900 font-bold leading-snug">Salah</span>),
                html: (<p className="text-sm text-gray-500 font-semibold">Jawaban Anda (<strong className="font-bold">{answer}</strong>) tidak sama dengan pertanyaan (<strong className="font-bold">{character}</strong>).</p>),
                icon: 'error',
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'Ulangi',
            }).then(({ isConfirmed }) => {
                if (isConfirmed) {

                }
            });
        }
    }

    const capture = useCallback(() => {
        setIsChecking(true);
        const imageSrc = webcamRef.current?.getScreenshot();

        if (imageSrc) {
            recognize(imageSrc, undefined, {
                workerPath: '/workers/tesseract.js/worker.min.js',
                workerBlobURL: false,
            })
                .then(({ data: { text } }: Tesseract.RecognizeResult) => {
                    console.log(text);
                    setIsChecking(false);
                })
                .catch((err) => console.log(err));
        }
    }, [webcamRef]);

    return (
        <>
            <Navbar />

            <main className="flex flex-grow flex-col justify-between pt-15">
                <Stepper active={1} count={1} />

                <section className="flex w-full justify-center items-center py-10">
                    {['J', 'e', 'r', 'u', 'k'].map((v) => (
                        <span className="mx-1" key={v}>
                            <CharacterFrame size={11} textSize="xl" rounded="lg">
                                {v}
                            </CharacterFrame>
                        </span>
                    ))}
                </section>

                <section className="px-16 mb-10">
                    <p className="text-white text-center text-sm font-semibold leading-none">
                        Tulislah kata <strong className="font-bold">{character}</strong> dengan <strong className="font-bold">Kanvas</strong>.
                    </p>
                </section>

                <section className="grid px-4 mb-4">
                    <IconButton
                        icon={<FaVolumeUp size="0.83rem" />}
                        title="Dengarkan Pengucapan"
                    // onClick={menuItem.onClick}
                    // isPing={menuItem.isUsingPing && isListeningPronounciation}
                    // key={menuItem.title}
                    />
                </section>

                <section className="flex flex-grow px-4 mb-4">
                    <div className="flex-grow bg-white rounded-xl overflow-hidden">
                        <Webcam
                            audio={false}
                            className="object-cover w-full h-full"
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={1280}
                            videoConstraints={videoConstraints}
                        />
                    </div>
                </section>

                <section className="mt-auto px-4 mb-4">
                    {isChecking ? (
                        <LoadingButton />
                    ) : (
                        <Button
                            {...webcamRef ?
                                { onClick: () => capture() }
                                : { disabled: true, }
                            }
                            center
                        >
                            Foto Jawaban
                        </Button>
                    )}
                </section>
            </main>
        </>
    )
};



export default AttemptedQuestionViaPaper;