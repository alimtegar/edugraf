import { RouteComponentProps } from 'react-router-dom';
import { FaVolumeUp, FaPen } from 'react-icons/fa';

// Types
import CharacterMenuItem from '../types/CharacterMenuItem';

// Components
import Frame from './Frame';
import CharacterMenuItemComponent from './CharacterMenuItem';
import Button from './Button';

type MatchParams = {
    character?: string | undefined;
}

const Character = ({ match }: RouteComponentProps<MatchParams>) => {
    const { params: { character, } } = match;

    const menu: CharacterMenuItem[] = [
        { title: 'Ubah Huruf Kecil', icon: character?.toLowerCase(), },
        { title: 'Dengarkan Pengucapan', icon: <FaVolumeUp size="0.83rem" className="transform -translate-y-0.25" />, },
        { title: 'Lihat Penulisan', icon: <FaPen size="0.83rem" className="transform -translate-y-0.25" />, },
    ];

    return (
        <main className="flex flex-grow flex-col bg-blue-200">
            {/* Space */}
            <div className="h-0.75"></div>
            {/*  */}

            <section className="flex flex-col justify-center items-center w-full px-11 py-11">
                <Frame size={28} textSize="6xl" rounded="xl">{character?.toUpperCase()}</Frame>
                <p className="text-blue-900 text-sm text-center font-semibold mt-6">Pelajari lebih lengkap tentang huruf <strong className="font-bold">A</strong> dengan menu di bawah ini.</p>
            </section>
            <div className="grid grid-cols gap-2 mt-auto mb-4 px-4">
                {menu.map((menuItem, i) => (
                    <CharacterMenuItemComponent {...menuItem} key={i} />
                ))}
            </div>
            <section className="px-4 mb-4">
                <div>
                    <Button
                        w="full"
                        h={12}
                        borderR="full"
                        shadow="default"
                    >
                        Latihan Menulis
                    </Button>
                </div>
            </section>
        </main>
    );
};



export default Character;