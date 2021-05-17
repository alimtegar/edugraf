import { useEffect, useCallback, } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { ToastContainer, } from 'react-toastify';
import Particles from "react-particles-js";


// Routes
import routes from '../Routes';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Components
import ProtectedRoute from './ProtectedRoute';
import Sidebar from './Sidebar';


const Wrapper = () => {
    // Contexts
    const authContext = useAuthContext();

    // Functions
    const validateToken = useCallback(() => {
        const storedAuth = localStorage.getItem('auth');

        if (storedAuth) {
            const auth = JSON.parse(storedAuth);

            axios.get(`${process.env.REACT_APP_API_URL}/validate-token`, {
                headers: {
                    'Authorization': `${auth.token.type} ${auth.token.token}`,
                }
            })
                .then((res) => {
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
            <div id="outer-container" className="bg-primary">
                <Sidebar />
                <Particles
                    height="100%"
                    width="100%"
                    className="absolute w-full h-screen"
                    params={{
                        particles: {
                            number: {
                                value: 8,
                                density: {
                                    enable: false
                                }
                            },
                            size: {
                                value: 100,
                                random: true,
                                // anim: {
                                //     speed: 0.5,
                                //     size_min: 0.3
                                // }
                            },
                            line_linked: {
                                enable: false
                            },
                            move: {
                                random: true,
                                speed: 1,
                                direction: 'top',
                                out_mode: 'out'
                            },
                            opacity: {
                                anim: {
                                    enable: false,
                                },
                                value: 0.2,
                            }
                        },
                    }}
                />
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
                <ToastContainer />
            </div>
        </Router>
    );
};

export default Wrapper;