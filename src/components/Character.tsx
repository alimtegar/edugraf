import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FaChevronLeft, FaVolumeUp, FaPen } from 'react-icons/fa';

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
    const [isListeningPronounciation, setIsListeningPronounciation] = useState<boolean>(false);;

    // Functions
    const changeCase = (character: string | undefined): string | undefined => {
        return character && character === character?.toUpperCase() ? character?.toLowerCase() : character?.toUpperCase();
    }
    const seeWriting = () => { }
    // 

    const initMenu: CharacterMenuItem[] = [
        {
            title: 'Dengarkan Pengucapan',
            icon: <FaVolumeUp size="0.83rem" className="transform -translate-y-0.25" />,
            onClick: () => characterContext.listenPronounciation(character, setIsListeningPronounciation), // AND with !isListeningPronounciation to prevent overlapping pronounciation
            isUsingPing: true,
        },
        {
            title: 'Lihat Penulisan',
            icon: <FaPen size="0.83rem" className="transform -translate-y-0.25" />,
            onClick: () => seeWriting(),
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
    }, [character])

    return (
        <main className="flex flex-grow flex-col bg-blue-200">
            <Navbar
                leftButton={{
                    onClick: () => history.replace(`/characters/category/${category}`),
                    icon: <FaChevronLeft size="0.83rem" />
                }}
            />
            {/* Space */}
            <div className="h-0.75"></div>
            {/*  */}

            <section className="flex flex-col justify-center items-center w-full pt-25 px-12 mb-8">
                <CharacterFrame size={28} textSize="6xl" rounded="xl">{character}</CharacterFrame>
                <p className="text-blue-900 text-sm text-center font-semibold mt-8">Pelajari lebih lengkap tentang huruf <strong className="font-bold">{character}</strong> dengan menu di bawah ini.</p>
            </section>

            <div className="grid grid-cols gap-2 mb-8 px-8">
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
                <div>
                    <Button>
                        Latihan Menulis
                    </Button>
                </div>
            </section>
        </main>
    );
};



export default Character;