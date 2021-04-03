import { useContext, useEffect, useCallback, } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, } from "react-router-dom";
import { ToastContainer, } from 'react-toastify';

// Routes
import routes from '../routes';

// Contexts
import AuthContext from '../contexts/AuthContext';

// Components
import ProtectedRoute from './ProtectedRoute';

const Layout = () => {
    // Contexts
    const authContext = useContext(AuthContext);

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
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [authContext]);

    // Effects
    useEffect(() => {
        validateToken();
    }, [validateToken]);

    return (
        <Router>
            <div className="flex flex-col w-screen min-h-screen overflow-hidden">
                <Switch>
                    {routes.map((route) => (
                        <ProtectedRoute
                            {...route}
                            key={route.path}
                        />))}
                </Switch>
                <ToastContainer />
            </div>
        </Router>
    );
};

export default Layout;