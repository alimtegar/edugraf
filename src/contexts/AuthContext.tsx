import { createContext } from "react";

// Types
import AuthContext from '../types/AuthContext';

const initState: AuthContext = {
    user: {
        id: 0,
        name: '',
        email: '',
    },
    token: {
        token: '',
        type: '',
    },
    setAuth: () => {},
    removeAuth: () => {},
};
const AuthContextComponent = createContext(initState);

export default AuthContextComponent;