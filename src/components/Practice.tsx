import { useState, } from 'react';
import { RouteComponentProps, } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import Tesseract, { recognize } from 'tesseract.js';
import { FaChevronLeft, FaVolumeUp } from 'react-icons/fa';

// Contexts
import { useCharacterContext } from '../contexts/CharacterContext';

// Components
import Navbar from './Navbar';
import CharacterFrame from './CharacterFrame';
import Stepper from './Stepper';
import Canvas from './Canvas';
import Button from './Button';
import Alert from './Alert';

// Types
import LoadingButton from './LoadingButton';

type MatchParams = {
    category?: string | undefined;
    character?: string | undefined;
}

const Practice = ({ match, history, }: RouteComponentProps<MatchParams>) => {
    const { params: { category, character } } = match;

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

    return (
        <div className="flex flex-col flex-grow bg-blue-200 w-screen">
            <Navbar leftButton={{
                icon: (<FaChevronLeft size="0.83rem" />),
                onClick: () => history.replace(`/characters/category/${category}/${character}`),
            }} />

            <main className="flex flex-grow flex-col justify-between pt-15">
                <Stepper active={1} count={1} />

                <section className="flex flex-col justify-center items-center w-full p-10">
                    <div className="relative">
                        <CharacterFrame size={28} textSize="6xl" rounded="xl">
                            {character}
                        </CharacterFrame>
                        <span className="absolute right-0 bottom-0 transform translate-x-1/3 translate-y-1/3">
                            <Button
                                w={11}
                                h={11}
                                borderR="full"
                                shadow="md"
                                center
                                isPing={isListeningPronounciation}
                                onClick={() => characterContext.listenPronounciation(character, setIsListeningPronounciation)}
                            >
                                <FaVolumeUp size="0.83rem" />
                            </Button>
                        </span>
                    </div>
                    <p className="text-blue-900 text-center text-sm mt-8 font-semibold leading-none">
                        Tulislah huruf <strong className="font-bold">{character}</strong> dengan <strong className="font-bold">Kanvas</strong>.
                    </p>
                </section>

                <section className="mt-auto px-4 pb-4">
                    <div className="mb-4">
                        <Canvas

                            h={64}
                            canvasRef={canvasRef}
                            setCanvasRef={setCanvasRef}
                        />
                    </div>
                    <div>
                        {isChecking ? (
                            <LoadingButton />
                        ) : (
                            <Button
                                {...canvasRef ?
                                    { onClick: () => check() }
                                    : { disabled: true, }
                                }
                                shadow="default"
                            >
                                Kirim Jawaban
                            </Button>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
};



export default Practice;