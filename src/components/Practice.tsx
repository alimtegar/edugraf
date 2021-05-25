import { useState, } from 'react';
import { RouteComponentProps, } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
// import Tesseract, { recognize } from 'tesseract.js';
import { FaChevronLeft, FaVolumeUp } from 'react-icons/fa';

// Utils
import { base64toBlob, recognize, validateAnswer } from '../Utils';

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

const Practice = ({ match, history, location, }: RouteComponentProps<MatchParams>) => {
    const { params: { category, character } } = match;
    const letterCase = new URLSearchParams(location.search).get('letter-case') || 'uppercase';

    // Context
    const characterContext = useCharacterContext();

    // States
    const [canvasRef, setCanvasRef] = useState<SignatureCanvas | null>(null);
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [isListeningPronounciation, setIsListeningPronounciation] = useState<boolean>(false);;

    // Functions
    const formatCharacter = (category: string, character: string) =>
        decodeURIComponent(category === 'letters' ? (letterCase === 'uppercase' ? character.toUpperCase() : character.toLowerCase()) : character);


    const check = () => {
        setIsChecking(true);

        if (canvasRef) {
            const srcImg = base64toBlob(canvasRef.toDataURL(), 'image/png');

            recognize(srcImg)
                .then((res) => answer(res))
                .catch((err) => console.log(err));
        }
    };

    const answer = (answer: string) => {
        setIsChecking(false);
        canvasRef?.clear();

        if (category && character) {
            if (validateAnswer(formatCharacter(category, character), answer)) {
                Alert.fire({
                    title: (<span className="text-lg text-gray-900 font-bold leading-snug">Benar</span>),
                    html: (<p className="text-sm text-gray-500 font-semibold">Jawaban anda (<strong className="font-bold">{formatCharacter(category, character)}</strong>) sama dengan pertanyaan (<strong className="font-bold">{formatCharacter(category, character)}</strong>).</p>),
                    icon: 'success',
                    confirmButtonText: 'Baik',
                }).then(({ isConfirmed }) => {
                    if (isConfirmed) {

                    }
                });
            } else {
                Alert.fire({
                    title: (<span className="text-lg text-gray-900 font-bold leading-snug">Salah</span>),
                    html: (<p className="text-sm text-gray-500 font-semibold">Jawaban anda (<strong className="font-bold">{answer}</strong>) tidak sama dengan pertanyaan (<strong className="font-bold">{formatCharacter(category, character)}</strong>).</p>),
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
    };

    return (
        <>
            <Navbar leftButton={{
                icon: (<FaChevronLeft size="0.83rem" />),
                onClick: () => history.replace(`/characters/category/${category}/${character}`),
            }} />

            <main className="flex flex-grow flex-col justify-between pt-15">
                <Stepper active={1} count={1} />

                <section className="flex flex-col justify-center items-center w-full p-10">
                    <div className="relative">
                        <CharacterFrame size={28} textSize="6xl" rounded="xl">
                            {category && character && formatCharacter(category, character)}
                        </CharacterFrame>
                        <span className="absolute right-0 bottom-0 transform translate-x-1/3 translate-y-1/3">
                            <Button
                                w={11}
                                h={11}
                                borderR="full"
                                shadow="default"
                                center
                                isPing={isListeningPronounciation}
                                onClick={character ? () => characterContext.listenPronounciation(decodeURIComponent(character), setIsListeningPronounciation) : () => { }}
                            >
                                <FaVolumeUp size="0.83rem" />
                            </Button>
                        </span>
                    </div>
                    <p className="text-white text-center text-sm mt-10 font-semibold leading-none">
                        {/* Tulislah (character category)... */}
                        Tulislah <strong className="font-bold">{category && character && formatCharacter(category, character)}</strong> dengan <strong className="font-bold">Kanvas</strong>.
                    </p>
                </section>

                <section className="flex flex-grow px-4 mb-4 md:mx-auto md:w-1/3">
                    <Canvas
                        canvasRef={canvasRef}
                        setCanvasRef={setCanvasRef}
                    />
                </section>

                <section className="mt-auto px-4 mb-4 md:mx-auto md:w-1/3">
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
                </section>
            </main>
        </>
    )
};



export default Practice;