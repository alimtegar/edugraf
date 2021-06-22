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
                <ToastContainer />
            </div>
        </Router>
    );
};

export default Wrapper;