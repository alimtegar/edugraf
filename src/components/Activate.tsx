import { useContext, useEffect, useCallback, } from 'react';
import axios from 'axios';
import { RouteComponentProps, } from 'react-router-dom';

// Contexts
import AuthContext from '../contexts/AuthContext';

// Components
import Loading from './Loading';

// Types
type MatchParams = {
    token?: string | undefined;
};

const Activate = ({ match }: RouteComponentProps<MatchParams>) => {
    const { params: { token, } } = match;

    // Contexts
    const authContext = useContext(AuthContext);

    // Functions
    const activate = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/activate/${token}`)
            .then((res) => {
                authContext.setAuth(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [token]);

    // Effects
    useEffect(() => {
        activate();
    }, [activate]);

    return (<Loading />)
};

export default Activate;