import { useEffect, useCallback, } from 'react';
import { FaBars, FaTimes, } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
            title: 'Materi Pembelajaran',
            subMenu: [
                {
                    title: 'Tabel Simbol',
                    description: 'Tabel huruf dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/symbols-table.svg`).default} className="h-10" alt="icon" />),
                    to: '/characters/category/symbols',
                },
                {
                    title: 'Tabel Huruf',
                    description: 'Tabel huruf dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/letters-table.svg`).default} className="h-10" alt="icon" />),
                    to: '/characters/category/letters',
                },
                {
                    title: 'Tabel Angka',
                    description: 'Tabel angka dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/numbers-table.svg`).default} className="h-10" alt="icon" />),
                    to: '/characters/category/numbers',
                },
            ],
        },
        {
            title: 'Tes Menulis',
            subMenu: [
                {
                    title: 'Tes Alat Tulis',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/stages-on-paper.svg`).default} className="h-10" alt="icon" />),
                    to: '/stages/category/on-paper',
                },
                {
                    title: 'Tes Simbol',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/symbol-stages-on-canvas.svg`).default} className="h-10" alt="icon" />),
                    to: '/stages/category/symbols',
                },
                {
                    title: 'Tes Huruf',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/letter-stages-on-canvas.svg`).default} className="h-10" alt="icon" />),
                    to: '/stages/category/letters',
                },
                {
                    title: 'Tes Angka',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/number-stages-on-canvas.svg`).default} className="h-10" alt="icon" />),
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
            showCloseButton: true,
            closeButtonHtml: (<FaTimes size="0.83rem" />),
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
                    <Link to="/edit-profile">
                        <Photo
                            {...authContext.user.photo && { photo: authContext.user.photo, }}
                            size={20}
                        />
                    </Link>
                </span>
                <span>
                    <p className="text-sm font-semibold leading-snug">Selamat datang,</p>
                    <Link to="/edit-profile">
                        <h1 className="text-lg font-extrabold leading-snug active:underline">
                            {authContext.user.name}
                        </h1>
                    </Link>
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