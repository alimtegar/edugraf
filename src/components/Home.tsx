import { FcAlphabeticalSortingAz, FcNumericalSorting12, FcPositiveDynamic } from 'react-icons/fc';

// Components
import HomeSubMenuItem from './HomeSubMenuItem';

// Types
import HomeMenuItem from '../types/HomeMenuItem';

const Home = () => {
    const menu: HomeMenuItem[] = [
        {
            title: 'Materi Belajar',
            subMenu: [
                {
                    title: 'Tabel Alfabet',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<FcAlphabeticalSortingAz size="3rem" />),
                },
                {
                    title: 'Tabel Angka',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<FcNumericalSorting12 size="3rem" />),
                }
            ],
        },
        {
            title: 'Materi Belajar',
            subMenu: [
                {
                    title: 'Menulis',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<FcPositiveDynamic size="3rem" />),
                },
            ],
        },
    ];

    return (
        <div className="flex-grow bg-blue-50">
            <header className="flex flex-col justify-center items-center bg-blue-200 text-blue-900 pt-3 pb-9 rounded-b-3xl">
                {/* Profile Photo */}
                <div className="bg-gray-200 w-32 h-32 mb-3 border-3 border-white rounded-full shadow overflow-hidden">
                    <img src="https://i.redd.it/bgc0a9q1xxo51.png" alt="" />
                </div>

                {/* Profile Name */}
                <p className="text-sm font-semibold">Selamat datang,</p>
                <h1 className="text-lg font-bold leading-snug">
                    Alim Tegar
                </h1>
            </header>

            <section className="grid grid-cols-1 gap-6 px-3 py-6">
                {menu.map((menuItem) => (
                    <div className="text-blue-900">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="font-bold leading-snug">
                                {menuItem.title}
                            </h2>
                            <span className="text-sm font-semibold">
                                {menuItem.subMenu.length} Item
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {menuItem.subMenu.map((subMenuItem, key) => (
                                <HomeSubMenuItem {...subMenuItem} key={key} />
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Home;