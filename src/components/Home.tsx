import { useEffect, useCallback, } from 'react';
import { FaTimes, } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Types
import HomeMenuItem from '../types/HomeMenuItem';

// Components
import Slider from './Slider';
import IconButton from './IconButton';
import HomeSubMenuItem from './HomeSubMenuItem';
import Alert from './Alert';
import MotoricGym from './MotoricGym';
import BottomNavbar from './BottomNavbar';
import Photo from './Photo';
import XpBar from './XpBar';

const Home = () => {
    const menu: HomeMenuItem[] = [
        {
            title: 'Materi Pembelajaran',
            subMenu: [
                {
                    title: 'Tabel Simbol',
                    description: 'Tabel huruf dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/symbols-table.svg`).default} className="h-14" alt="icon" />),
                    to: '/characters/category/symbols',
                },
                {
                    title: 'Tabel Huruf',
                    description: 'Tabel huruf dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/letters-table.svg`).default} className="h-14" alt="icon" />),
                    to: '/characters/category/letters',
                },
                {
                    title: 'Tabel Angka',
                    description: 'Tabel angka dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/numbers-table.svg`).default} className="h-14" alt="icon" />),
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
                    icon: (<img src={require(`../assets/images/stages-on-paper.svg`).default} className="h-14" alt="icon" />),
                    to: '/stages/category/on-paper',
                },
                {
                    title: 'Tes Simbol',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/stages-on-canvas.svg`).default} className="h-14" alt="icon" />),
                    to: '/stages/category/symbols',
                },
                {
                    title: 'Tes Huruf',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/stages-on-canvas.svg`).default} className="h-14" alt="icon" />),
                    to: '/stages/category/letters',
                },
                {
                    title: 'Tes Angka',
                    description: 'Tabel alfabet dan cara penulisannya',
                    icon: (<img src={require(`../assets/images/stages-on-canvas.svg`).default} className="h-14" alt="icon" />),
                    to: '/stages/category/numbers',
                },
            ],
        },
    ];

    // Contexts
    const { user: { name, photo } } = useAuthContext();

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
            closeButtonHtml: (<FaTimes size="1rem" />),
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
            <header className="flex items-center justify-center bg-white text-gray-700 p-8 md:p-12 rounded-b-3xl shadow-default">
                <div className="mr-6">
                    <Photo photo={photo} size={20} shadow="none" />
                </div>
                <div className="flex-1">
                    <Link to="/edit-profile">
                        <h1 className="text-xl font-extrabold leading-none active:underline hover:underline mb-4">
                            {name}
                        </h1>
                    </Link>

                    <XpBar />
                </div>
            </header>

            <main className="flex flex-grow md:mx-auto md:w-full">
                <section className="flex-grow w-full text-gray-700 p-4">
                    <div className="flex flex-col mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-sm leading-none">
                                Senam
                            </h2>
                        </div>
                        <IconButton
                            icon={(<img src={require(`../assets/images/gym.svg`).default} className="h-8" alt="Senam" />)}
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
                                    responsive: [
                                        {
                                            breakpoint: 1440,
                                            settings: {
                                                slidesToShow: 3,
                                            }
                                        },
                                        {
                                            breakpoint: 768,
                                            settings: {
                                                slidesToShow: 2,
                                            }
                                        },
                                    ],
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

            <BottomNavbar />
        </div>
    );
};

export default Home;