import classNames from 'classnames';

// Components
import Navbar from './Navbar';
import BottomNavbar from './BottomNavbar';
import IconButton from './IconButton';

type MdealProps = {
    position: number,
};

const Medal = ({ position }: MdealProps) => {
    let addClassNames = 'bg-gray-100 text-gray-500';

    switch (position) {
        case 1: addClassNames = 'bg-gradient-to-tl from-yellow-300 to-yellow-200 text-yellow-700'; break;
        case 2: addClassNames = 'bg-gradient-to-tl from-gray-300 to-gray-200 text-gray-700'; break;
        case 3: addClassNames = 'bg-gradient-to-tl from-yellow-600 to-yellow-500 text-white'; break;
    }

    return (
        <span className={classNames('flex justify-center items-center text-sm font-bold w-8 h-8 rounded-full', addClassNames)}>
            {position}
        </span>
    );
};

const Leaderboard = () => {
    const leaderboard = [
        {
            name: 'Unggul Perdana',
            photo: 'https://image.flaticon.com/icons/png/512/2945/2945298.png',
            xp: 4269,
        },
        {
            name: 'Belinda Pratiwi',
            photo: 'https://image.flaticon.com/icons/png/512/2945/2945328.png',
            xp: 3849,
        },
        {
            name: 'Drajat Samosir',
            photo: 'https://image.flaticon.com/icons/png/512/2945/2945444.png',
            xp: 3429,
        },
        {
            name: 'Belinda Pratiwi',
            photo: 'https://image.flaticon.com/icons/png/512/2945/2945403.png',
            xp: 3009,
        },
        {
            name: 'Oni Riyanti',
            photo: 'https://image.flaticon.com/icons/png/512/2945/2945381.png',
            xp: 2590,
        },
        {
            name: 'Muna Noviyanti',
            photo: 'https://image.flaticon.com/icons/png/512/2945/2945413.png',
            xp: 2069,
        },
        {
            name: 'Ega Habibi',
            photo: 'https://image.flaticon.com/icons/png/512/2945/2945330.png',
            xp: 1780,
        },
        {
            name: 'Hamima Hariyah',
            photo: 'https://image.flaticon.com/icons/png/512/2945/2945305.png',
            xp: 1503,
        },
        {
            name: 'Praba Wibowo',
            photo: 'https://image.flaticon.com/icons/png/512/2945/2945311.png',
            xp: 1150,
        },
        {
            name: 'Alambana Megantara',
            photo: 'https://image.flaticon.com/icons/png/512/2945/2945229.png',
            xp: 960,
        },
    ];

    return (
        <div className="attempted-stage flex flex-col flex-grow">
            <Navbar title="Peringkat" />
            <main className="w-full pt-17 pb-29">
                <section className="flex flex-row justify-center items-center mb-8">
                    <span className="text-center mx-2">
                        <div className="relative mb-3">
                            <div className="w-22 h-22 flex justify-center items-end text-gray-400 border-3 border-white rounded-full shadow-default overflow-hidden focus:outline-none" style={{ backgroundColor: '#e0ecff', }}>
                                <img alt="Foto Profil" style={{ height: '80%', }} src="https://image.flaticon.com/icons/png/512/2945/2945328.png" />
                            </div>
                            <span className="absolute right-0 bottom-0 transform translate-x-1/6 translate-y-1/6">
                                <Medal position={2} />
                            </span>
                        </div>
                        <h2 className="font-bold text-lg leading-none">Belinda P.</h2>
                        <span className="text-sm font-bold text-gray-500">3849 XP</span>
                    </span>

                    <span className="text-center mx-2">
                        <div className="relative mb-3">
                            <div className="w-24 h-24 flex justify-center items-end text-gray-400 border-3 border-white rounded-full shadow-default overflow-hidden focus:outline-none" style={{ backgroundColor: '#e0ecff', }}>
                                <img alt="Foto Profil" style={{ height: '80%', }} src="https://image.flaticon.com/icons/png/512/2945/2945298.png" />
                            </div>
                            <span className="absolute right-0 bottom-0 transform translate-x-1/6 translate-y-1/6">
                                <Medal position={1} />
                            </span>
                        </div>
                        <h2 className="font-bold text-lg leading-none">Unggul P.</h2>
                        <span className="text-sm font-bold text-gray-500">4269 XP</span>
                    </span>

                    <span className="text-center mx-2">
                        <div className="relative mb-3">
                            <div className="w-20 h-20 flex justify-center items-end text-gray-400 border-3 border-white rounded-full shadow-default overflow-hidden focus:outline-none" style={{ backgroundColor: '#e0ecff', }}>
                                <img alt="Foto Profil" style={{ height: '80%', }} src="https://image.flaticon.com/icons/png/512/2945/2945444.png" />
                            </div>
                            <span className="absolute right-0 bottom-0 transform translate-x-1/6 translate-y-1/6">
                                <Medal position={3} />
                            </span>
                        </div>
                        <h2 className="font-bold text-lg leading-none">Drajat S.</h2>
                        <span className="text-sm font-bold text-gray-500">3429 XP</span>
                    </span>
                </section>
                <section className="grid gap-2 w-full px-8">
                    {leaderboard.map(({ name, photo, xp, }, i) => (
                        <IconButton
                            title={name}
                            description={xp.toString() + ' XP'}
                            icon={(
                                <div className="flex justify-center items-end w-12 h-12"  style={{ backgroundColor: '#e0ecff', }}>
                                    <img src={photo} alt={name} style={{ height: '80%', }} />
                                </div>
                            )}
                            subIcon={(<Medal position={i + 1} />)}
                            key={name}
                        />
                    ))}
                </section>
            </main>
            <BottomNavbar />
        </div>
    );
};

export default Leaderboard;