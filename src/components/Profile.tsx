import { useState, useEffect, } from 'react';
import axios, { AxiosResponse, } from 'axios';
import { FaAngleDoubleRight, FaSignOutAlt } from 'react-icons/fa';
import { Link, } from 'react-router-dom';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Components
import Navbar from './Navbar';
import BottomNavbar from './BottomNavbar';
import ProfileHeader from './ProfileHeader';
import ProfileChart from './ProfileChart';
import Slider from './Slider';
import AchievementsItem from './AchievementsItem';
import Alert from './Alert';

// Types
import AcquiredAchievement from '../types/AcquiredAchievement';

const Profile = () => {
    // Contexts
    const authContext = useAuthContext();

    // States
    const [acquiredAchievements, setAcquiredAchievements] = useState<AcquiredAchievement[]>();

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/acquired-achievements?limit=3`)
            .then((res: AxiosResponse<AcquiredAchievement[]>) => setAcquiredAchievements([
                ...(acquiredAchievements || []),
                ...res.data,
            ]))
            .catch((err) => console.error(err));
    }, [])

    // Functions
    const logout = () => {
        Alert.fire({
            title: (<span className="text-lg text-gray-900 font-bold leading-snug">Apakah anda yakin?</span>),
            html: (<p className="text-sm text-gray-600 font-semibold">Anda akan keluar dari akun <strong className="font-bold">{authContext.user.name}</strong>.</p>),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                authContext.removeAuth();
                authContext.setAuthLoading(false);
            }
        });
    }

    return (
        <div className="flex-grow overflow-y-scroll pb-22">
            <Navbar
                rightButton={{
                    icon: (<FaSignOutAlt size="1rem" className="transform translate-x-px" />),
                    onClick: logout,
                }}
                rightButtonSettings={{
                    bgColor: 'gradient-to-tl from-red-500 to-red-400',
                    bgColorOn: 'gradient-to-tl from-red-600 to-red-500',
                    textColor: 'white',
                    textColorOn: 'white',
                }}
            />

            <ProfileHeader />

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