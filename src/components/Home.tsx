import { useEffect, useCallback, } from 'react';
import { FaBars } from 'react-icons/fa';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Types
import HomeMenuItem from '../types/HomeMenuItem';
import { FaChild } from 'react-icons/fa';

// Components
import Navbar from './Navbar';
import Slider from './Slider';
import IconButton from './IconButton';
import HomeSubMenuItem from './HomeSubMenuItem';
import { useSidebarContext } from '../contexts/SidebarContext';
import Photo from './Photo';
import Alert from './Alert';
import MotoricGym from './MotoricGym';

const Home = () => {
    const menu: HomeMenuItem[] = [
        {
            title: 'Materi Belajar',
            subMenu: [
                {
                    title: 'Tabel Simbol',
                    description: 'Tabel huruf dan cara penulisannya',
                    icon: (<img src={`${process.env.PUBLIC_URL}/icons/symbols-table.svg`} className="h-10" alt="icon" />),
                    to: '/characters/category/symbols',
                },
                {
                    title: 'Tabel Huruf',
                    description: 'Tabel huruf dan cara penulisannya',
                    icon: (<img src={`${process.env.PUBLIC_URL}/icons/letters-table.svg`} className="h-10" alt="icon" />),
                    to: '/characters/category/letters',
                },
                {
                    title: 'Tabel Angka',
                    description: 'Tabel angka dan cara penulisannya',
                    icon: (<img src={`${process.env.PUBLIC_URL}/icons/numbers-table.svg`} className="h-10" alt="icon" />),
                    to: '/characters/category/numbers',
                },
            ],
        },
        {
            title: 'Tes Kemampuan',
            subMenu: [
                {
                    title: 'Tes dg. Kertas',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src={`${process.env.PUBLIC_URL}/icons/stages-on-paper.svg`} className="h-10" alt="icon" />),
                    to: '/stages/category/on-paper',
                },
                {
                    title: 'Tes Simbol',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src={`${process.env.PUBLIC_URL}/icons/symbol-stages-on-canvas.svg`} className="h-10" alt="icon" />),
                    to: '/stages/category/symbols',
                },
                {
                    title: 'Tes Huruf',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src={`${process.env.PUBLIC_URL}/icons/letter-stages-on-canvas.svg`} className="h-10" alt="icon" />),
                    to: '/stages/category/letters',
                },
                {
                    title: 'Tes Angka',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src={`${process.env.PUBLIC_URL}/icons/number-stages-on-canvas.svg`} className="h-10" alt="icon" />),
                    to: '/stages/category/numbers',
                },
            ],
        },
    ];

    // Contexts
    const authContext = useAuthContext();
    const sidebarContext = useSidebarContext();

    // Functions
    const showMotoricGym = useCallback(() => {
        Alert.fire({
            customClass: {
                popup: 'motoric-gym',
            },
            title: (<span className="text-lg text-gray-900 font-bold leading-snug mb-2">Senam Motorik</span>),
            html: (<MotoricGym />),
            showCancelButton: false,
            showConfirmButton: false,
        }).then(() => {
            localStorage.setItem('is-motoric-gym-watched', '1');
        });
    }, []);

    // Effects
    useEffect(() => {
        const isMotoricGymWatched = localStorage.getItem('is-motoric-gym-watched');

        if (!isMotoricGymWatched) {
            showMotoricGym();
        }
    }, [showMotoricGym]);

    return (
        <div className="flex flex-col flex-grow">
            <Navbar leftButton={{
                icon: (<FaBars size="0.83rem" />),
                onClick: sidebarContext.toggleSidebar,
            }} />
            <header className="flex justify-center items-center text-white pt-15 pb-6 md:pt-21 md:pb-12">
                <span className="mr-4">
                    <Photo
                        {...authContext.user.photo && { photo: `${process.env.REACT_APP_API_URL}/${authContext.user.photo}` }}
                        size={20}
                    />
                </span>
                <span>
                    <p className="text-sm font-semibold leading-snug">Selamat datang,</p>
                    <h1 className="text-lg font-extrabold leading-snug">
                        {authContext.user.name}
                    </h1>
                </span>
            </header>

            <main className="flex flex-grow md:mx-auto md:w-1/2">
                <section className="grid grid-cols-1 gap-4 flex-grow bg-white bg-opacity-95 text-gray-700 pt-6 pb-4 px-4 rounded-t-2xl shadow-default">
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold leading-none">
                                Senam Motorik
                            </h2>
                        </div>
                        <IconButton
                            icon={(<FaChild size="1.16rem" />)}
                            title="Senam Motorik"
                            onClick={showMotoricGym}
                        />
                    </div>


                    {menu.map((menuItem, i) => (
                        <div className="flex flex-col" key={i}>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-bold leading-none">
                                    {menuItem.title}
                                </h2>
                                <span className="text-sm font-semibold leading-none"><strong className="font-bold">{menuItem.subMenu.length}</strong> Item</span>
                            </div>
                            <div className="relative -m-1">
                                <Slider settings={{
                                    dots: false,
                                    infinite: false,
                                    speed: 500,
                                    slidesToShow: 2,
                                }}>
                                    {menuItem.subMenu.map((subMenuItem) => (
                                        <div className="p-1" key={subMenuItem.to}>
                                            <HomeSubMenuItem {...subMenuItem} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Home;