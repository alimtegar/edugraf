import { useState, useEffect, } from 'react';
import { RouteComponentProps, Link, } from 'react-router-dom';
import { FaChevronLeft, FaVolumeUp, FaPen, } from 'react-icons/fa';

// Contexts
import { useCharacterContext } from '../contexts/CharacterContext';

// Components
import Navbar from './Navbar';
import CharacterFrame from './CharacterFrame';
import Button from './Button';
import IconButton from './IconButton';

// Types
import TranslatedCategory from '../types/TranslatedCategory';

type MatchParams = {
    category?: string | undefined,
    character?: string | undefined,
};

const Character = ({ match, history, location }: RouteComponentProps<MatchParams>) => {
    const { params: { category, character } } = match;
    const letterCase = new URLSearchParams(location.search).get('letter-case') || 'uppercase';
    const translatedCategory: TranslatedCategory = {
        symbols: 'simbol',
        letters: 'huruf',
        numbers: 'angka',
    };

    // Contexts
    const characterContext = useCharacterContext();

    // States
    const [isWriting, setIsWriting] = useState(false);
    const [isListeningPronounciation, setIsListeningPronounciation] = useState(false);

    // Effects
    useEffect(() => {
        // componentWillUnmount
        return () => {
            // Clean up
            setIsWriting(false)
            setIsListeningPronounciation(false);
        }
    }, [character, category, letterCase]);

    return (
        <main className="flex flex-grow flex-col">
            <Navbar
                title="Detail Karakter"
                leftButton={{
                    onClick: () => history.replace(`/characters/category/${category}`),
                    icon: <FaChevronLeft size="1rem" />
                }}
            />
            {/* Space */}
            <div className="h-0.75"></div>
            {/*  */}

            <section className="flex flex-col justify-center items-center w-full pt-25 px-16 mb-10">
                <CharacterFrame size={28} textSize="6xl" rounded="xl">
                    {category && character && (
                        <img
                            src={require(`../assets/images/writings/${category}/${category === 'letters' ? `${letterCase}/` : ''}${decodeURIComponent(category === 'letters' ? (letterCase === 'uppercase' ? character.toUpperCase() : character.toLowerCase()) : character).charCodeAt(0)}.${isWriting ? 'gif' : 'jpg'}`).default}
                            alt={decodeURIComponent(character)}
                            className="h-20 rounded-lg"
                        />
                    )}
                </CharacterFrame>
                <p className="text-gray-700 text-sm text-center font-semibold mt-10 md:mx-auto md:w-1/2">Pelajari lebih lengkap tentang {category && translatedCategory[category]} <strong className="font-bold">{character && decodeURIComponent(character)}</strong> dengan menu di bawah ini.</p>
            </section>

            <div className="grid grid-cols gap-2 mb-10 px-8 md:mx-auto md:w-1/3">
                <IconButton
                    icon={(<FaVolumeUp size="1rem" className="transform -translate-y-0.25" />)}
                    iconBgColor="gradient-to-tl from-blue-500 to-blue-400"
                    iconBgColorOn="gradient-to-tl from-blue-500 to-blue-400"
                    iconTextColor="white"
                    iconTextColorOn="white"
                    title="Dengarkan Pengucapan"
                    isPing={isListeningPronounciation}
                    onClick={character ? () => characterContext.listenPronounciation(decodeURIComponent(character), setIsListeningPronounciation) : () => { }}  // AND with !isListeningPronounciation to prevent overlapping pronounciation
                />
                <IconButton
                    icon={(<FaPen size="1rem" className="transform -translate-y-0.25" />)}
                    iconBgColor={isWriting ? 'red-500' : 'gradient-to-tl from-blue-500 to-blue-400'}
                    iconBgColorOn={isWriting ? 'red-600' : 'gradient-to-tl from-blue-500 to-blue-400'}
                    iconTextColor="white"
                    iconTextColorOn="white"
                    title={`${isWriting ? 'Sembunyikan' : 'Tampilkan'} Penulisan`}
                    onClick={() => setIsWriting((prevState) => !prevState)}
                />
                {(category === 'letters' && character) && (
                    <IconButton
                        icon={letterCase === 'uppercase' ? character.toLowerCase() : character.toUpperCase()}
                        iconBgColor="gradient-to-tl from-blue-500 to-blue-400"
                        iconBgColorOn="gradient-to-tl from-blue-500 to-blue-400"
                        iconTextColor="white"
                        iconTextColorOn="white"
                        title={`Ubah Huruf ${letterCase === 'uppercase' ? 'Kecil' : 'Besar'}`}
                        onClick={() => history.push(`/characters/category/${category}/${character}?letter-case=${letterCase === 'uppercase' ? 'lowercase' : 'uppercase'}`)}
                    />
                )}
            </div>
            <section className="px-4 mt-auto mb-4 md:mx-auto md:w-1/3">
                <Link to={`/practice/category/${category}/${character}?letter-case=${letterCase}`}>
                    <Button shadow="default">
                        Latihan Menulis
                    </Button>
                </Link>
            </section>
        </main>
    );
};



export default Character;