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

    // Functions
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
                    if (true) {
                        // if (res.data.user.level > auth.user.level) {
                        toast.success((
                            <div className="flex items-center">
                                <div className="flex justify-center items-center w-12 h-12 bg-blue-50 mr-4 rounded-full">
                                    <img src={require(`../assets/images/level-up.svg`).default} className="h-7" alt="Naik Level" />
                                </div>
                                <div>
                                    <div className="font-bold leading-none">Naik Level {res.data.user.level}</div>
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
                    toastClassName={(parameter) => contextClass[parameter?.type || 'default'] + ' relative flex justify-between bg-white text-gray-700 font-semibold m-4 p-2 border-l-3 rounded-sm shadow-default overflow-hidden cursor-pointer'}
                />
            </div>
        </Router>
    );
};

export default Wrapper;