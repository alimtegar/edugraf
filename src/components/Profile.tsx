import { useState, useEffect, } from 'react';
import axios, { AxiosResponse, } from 'axios';
import { FaAngleDoubleRight, FaPen, } from 'react-icons/fa';
import { Link, } from 'react-router-dom';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Components
import BottomNavbar from './BottomNavbar';
import Photo from './Photo';
import XpBar from './XpBar';
import Slider from './Slider';
import AchievementsItem from './AchievementsItem';
import Button from './Button';
import ProfileChart from './ProfileChart';

// Types
import AcquiredAchievement from '../types/AcquiredAchievement';

const Profile = () => {
    // Contexts
    const { user: { name, photo, } } = useAuthContext();

    // States
    const [acquiredAchievements, setAcquiredAchievements] = useState<AcquiredAchievement[]>();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/acquired-achievements?limit=3`)
            .then((res: AxiosResponse<AcquiredAchievement[]>) => setAcquiredAchievements([
                ...(acquiredAchievements || []),
                ...res.data,
            ]))
            .catch((err) => console.error(err));
    }, [])

    return (
        <div className="flex-grow overflow-y-scroll pb-22">
            <header className="text-gray-700 text-center p-8 md:pt-21 md:pb-12">
                <div className="inline-flex relative mb-3">
                    <Photo photo={photo} size={24} />
                    <span className="absolute right-0 bottom-0 transform translate-x-1/6 translate-y-1/6">
                        <Link to="/edit-profile">
                            <Button
                                w={11}
                                h={11}
                                bgColor="white"
                                bgColorOn="white"
                                textColor="gray-400"
                                textColorOn="blue-500"
                                shadow="default"
                                center
                                onClick={() => { }}
                            >
                                <FaPen />
                            </Button>
                        </Link>
                    </span>
                </div>
                <div className="flex-1">
                    <h1 className="text-xl font-extrabold leading-none active:underline hover:underline mb-4">
                        {name}
                    </h1>
                    <XpBar bgColor="gray-500 bg-opacity-10" />
                </div>
            </header>

            <main>
                {/* Chart */}
                <section className="px-4 mb-4">
                    <ProfileChart />
                </section>

                {/* Achievements */}
                <section className="px-4 mb-4">
                    <div className="flex justify-between items-center text-sm mb-4">
                        <h2 className="font-bold leading-none">
                            Penghargaan
                        </h2>
                    </div>
                    <div className="relative -m-1">
                        {acquiredAchievements ? (
                            <Slider
                                // arrowSettings={{
                                //     bgColor: 'white',
                                //     bgColorOn: 'white',
                                //     textColor: 'gray-400',
                                //     textColorOn: 'blue-500',
                                // }}
                                settings={{
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
                                                slidesToShow: 3,
                                            }
                                        },
                                    ],
                                }}
                            >
                                {[...acquiredAchievements, undefined].map((acquiredAchievement) => acquiredAchievement ? (
                                    <div className="p-1" key={acquiredAchievement.achievement.id}>
                                        <AchievementsItem
                                            {...acquiredAchievement.achievement}
                                            is_locked={acquiredAchievement.progress < 100}
                                        />
                                    </div>
                                ) : (
                                    <div className="p-1">
                                        <Link to="/achievements">
                                            <div
                                                className="relative text-center w-full px-4 py-6 rounded-lg shadow-default overflow-hidden bg-white text-gray-400">
                                                <div
                                                    className="flex justify-center items-center"
                                                    style={{
                                                        height: '3.83rem',
                                                    }}
                                                >
                                                    {/* <div className="inline-flex justify-center items-center border-3 w-12 h-12 rounded-full"> */}
                                                    <FaAngleDoubleRight className="inline-flex" size="1.66rem" />
                                                    {/* </div> */}
                                                </div>

                                                <h2 className="text-sm font-bold leading-none">
                                                    Lihat Lebih <br /> Banyak
                                                </h2>
                                                <div className="absolute -right-8 -bottom-4 bg-white bg-opacity-20 w-24 h-24 rounded-full" />
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </Slider>
                        ) : null}
                    </div>
                </section>
            </main>

            <BottomNavbar />
        </div >
    );
};

export default Profile;