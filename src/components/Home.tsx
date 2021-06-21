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
            {/* <Navbar leftButton={{
                icon: (<FaBars size="0.83rem" />),
                onClick: sidebarContext.toggleSidebar,
            }} /> */}

            <header className="flex items-center bg-white text-gray-700 p-8 md:pt-21 md:pb-12 rounded-b-3xl shadow-default">
                <div className="mr-6">
                    <Link to="/edit-profile">
                        <Photo
                            {...authContext.user.photo && { photo: authContext.user.photo, }}
                            size={20}
                        />
                    </Link>
                </div>
                <div className="flex-1">
                    <Link to="/edit-profile">
                        <h1 className="text-xl font-extrabold leading-snug active:underline hover:underline">
                            {authContext.user.name}
                        </h1>
                    </Link>

                    <div className="relative pt-4">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                            <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                            <div>
                                <span className="font-bold text-sm leading-none inline-block">
                                    Level 1
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="font-bold text-sm text-yellow-600 leading-none inline-block">
                                    0/100 XP
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex flex-grow md:mx-auto md:w-1/2">
                <section className="flex-grow w-full text-gray-700 p-4">
                    <div className="flex flex-col mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-sm leading-none">
                                Senam
                            </h2>
                        </div>
                        <IconButton
                            icon={(<FaChild size="1.16rem" />)}
                            title="Senam"
                            onClick={showMotoricGym}
                        />
                    </div>


                    {menu.map((menuItem, i) => (
                        <div className="flex flex-col mb-4" key={i}>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-bold text-sm leading-none">
                                    {menuItem.title}
                                </h2>
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