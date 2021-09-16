import { useEffect, useCallback, } from 'react';
import axios, { AxiosResponse } from 'axios';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { ToastContainer, } from 'react-toastify';
import { toast, } from 'react-toastify';

// Routes
import routes from '../Routes';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Components
import ProtectedRoute from './ProtectedRoute';

// Types
import Auth from '../types/Auth';
import AcquiredAchievement from '../types/AcquiredAchievement';

const Wrapper = () => {
    const contextClass = {
        success: 'border-blue-500',
        error: 'border-red-500',
        info: 'border-gray-500',
        warning: 'border-yellow-500',
        default: 'border-blue-500',
        dark: 'border-gray-500',
    };

    // Contexts
    const authContext = useAuthContext();

    const validateToken = useCallback(() => {
        const storedAuth = localStorage.getItem('auth');

        if (storedAuth) {
            const auth: Auth = JSON.parse(storedAuth);

            axios.get(`${process.env.REACT_APP_API_URL}/validate-token`, {
                headers: {
                    'Authorization': `${auth.token.type} ${auth.token.token}`,
                }
            })
                .then((res: AxiosResponse<Auth>) => {
                    // If level updated, show notification
                    if (res.data.user.level > auth.user.level) {
                        toast.success((
                            <div className="flex items-center">
                                <div>
                                    <div className="flex justify-center items-center w-12 h-12 bg-blue-50 mr-4 rounded-full">
                                        <img src={require(`../assets/images/level-up.svg`).default} className="h-7" alt="Naik Level" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold leading-none text-gray-700 mb-1">Naik Level {res.data.user.level}</div>
                                    <div className="text-sm text-gray-600">Selamat! Kamu naik ke level {res.data.user.level}.</div>
                                </div>
                            </div>
                        ), {
                            position: 'top-center',
                            hideProgressBar: true,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    }

                    // If achievement updated, show notification
                    if (true || res.data.user.acquired_achievement_count > auth.user.acquired_achievement_count) {
                        axios.get(`${process.env.REACT_APP_API_URL}/acquired-achievements/latest`, {
                            headers: {
                                'Authorization': `${res.data.token.type} ${res.data.token.token}`,
                            }
                        })
                            .then((res: AxiosResponse<AcquiredAchievement>) => {
                                toast.success((
                                    <div className="flex items-center">
                                        <div>
                                            <div className="flex justify-center items-center w-12 h-12 bg-blue-50 mr-4 rounded-full">
                                                <img src={require(`../assets/images/achievement.svg`).default} className="h-9" alt="Naik Level" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold leading-none text-gray-700 mb-1">{res.data.achievement.title}</div>
                                            <div className="text-sm text-gray-600">Selamat! Kamu mendapatkan penghargaan "{res.data.achievement.title}".</div>
                                        </div>
                                    </div>
                                ), {
                                    position: 'top-center',
                                    hideProgressBar: true,
                                    closeOnClick: false,
                                    pauseOnHover: true,
                                    draggable: true,
                                });
                            })
                            .catch((err) => console.error(err))
                    }

                    authContext.setAuth(res.data);
                    authContext.setAuthLoading(false);

                })
                .catch((err) => {
                    console.error(err);
                    authContext.setAuthLoading(false);
                });
        } else {
            authContext.setAuthLoading(false);
        }
    }, [authContext]);

    // Effects
    useEffect(() => {
        validateToken();
    }, []);

    return (
        <Router>
            <div id="outer-container">
                <div id="page-wrap" className="relative z-10 flex flex-col w-screen min-h-screen overflow-hidden">
                    <Switch>
                        {routes.map((route) => (
                            <ProtectedRoute
                                {...route}
                                key={route.path}
                            />))}
                        <Redirect to={`/404`} />
                    </Switch>
                </div>
                <ToastContainer
                    toastClassName={(parameter) => contextClass[parameter?.type || 'default'] + ' relative flex justify-between bg-white text-gray-600 text-sm font-semibold m-4 py-2 pl-2 pr-12 border-l-3 rounded-sm shadow-default overflow-hidden cursor-pointer'}
                />
            </div>
        </Router>
    );
};

export default Wrapper;