import { useState, useEffect, useMemo, } from 'react';
import { RouteComponentProps, Link, } from 'react-router-dom';
import { FaChevronLeft, FaVolumeUp, FaPen, } from 'react-icons/fa';

// Contexts
import { useCharacterContext } from '../contexts/CharacterContext';

// Types
import CharacterMenuItem from '../types/CharacterMenuItem';

// Components
import Navbar from './Navbar';
import CharacterFrame from './CharacterFrame';
import Button from './Button';
import IconButton from './IconButton';

type MatchParams = {
    category?: string | undefined;
    character?: string | undefined;
}

const Character = ({ match, history }: RouteComponentProps<MatchParams>) => {
    const { params: { category, character, } } = match;

    // Contexts
    const characterContext = useCharacterContext();

    // States
    const [isWriting, setIsWriting] = useState(false);
    const [isListeningPronounciation, setIsListeningPronounciation] = useState(false);

    // Functions
    const changeCase = (character: string | undefined): string | undefined => {
        return character && character === character?.toUpperCase() ? character?.toLowerCase() : character?.toUpperCase();
    }

    const initMenu: CharacterMenuItem[] = [
        {
            title: 'Dengarkan Pengucapan',
            icon: <FaVolumeUp size="0.83rem" className="transform -translate-y-0.25" />,
            onClick: () => characterContext.listenPronounciation(character, setIsListeningPronounciation), // AND with !isListeningPronounciation to prevent overlapping pronounciation
            isUsingPing: true,
        },
        {
            title: `${isWriting ? 'Sembunyikan' : 'Tampilkan'} Penulisan`,
            icon: <FaPen size="0.83rem" className="transform -translate-y-0.25" />,
            onClick: () => { setIsWriting((prevState) => !prevState) },
            isUsingPing: false,
        },
    ];
    const [menu, setMenu] = useState(initMenu);

    useEffect(() => {
        if (category === 'letters') {
            setMenu([
                ...initMenu,
                {
                    title: 'Ubah Huruf Kecil',
                    icon: changeCase(character),
                    onClick: () => history.push(`/characters/category/${category}/${changeCase(character)}`),
                    isUsingPing: false,
                },
            ]);
        }
    }, [character, category, history])

    return (
        <main className="flex flex-grow flex-col">
            <Navbar
                leftButton={{
                    onClick: () => history.replace(`/characters/category/${category}`),
                    icon: <FaChevronLeft size="0.83rem" />
                }}
            />
            {/* Space */}
            <div className="h-0.75"></div>
            {/*  */}

            <section className="flex flex-col justify-center items-center w-full pt-25 px-16 mb-10">
                <CharacterFrame size={28} textSize="6xl" rounded="xl">
                    {/* {character} */}
                    <img src={`/writings/${character}.${isWriting ? 'gif' : 'jpg'}`} alt={character} className="h-20 rounded-lg" />
                </CharacterFrame>
                <p className="text-white text-sm text-center font-semibold mt-10">Pelajari lebih lengkap tentang huruf <strong className="font-bold">{character}</strong> dengan menu di bawah ini.</p>
            </section>

            <div className="grid grid-cols gap-2 mb-10 px-8">
                {menu.map((menuItem) => (
                    <IconButton
                        icon={menuItem.icon}
                        title={menuItem.title}
                        onClick={menuItem.onClick}
                        isPing={menuItem.isUsingPing && isListeningPronounciation}
                        key={menuItem.title}
                    />
                ))}
            </div>
            <section className="px-4 mt-auto mb-4">
                <Link to={`/practice/category/${category}/${character}`}>
                    <Button>
                        Latihan Menulis
                    </Button>
                </Link>
            </section>
        </main>
    );
};



export default Character;