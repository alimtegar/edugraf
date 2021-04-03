// Types
import AuthContext from '../types/AuthContext';

const authContextInitialState: AuthContext = {
    user: {
        id: 0,
        name: '',
        email: '',
    },
    token: {
        token: '',
        type: '',
    },
    setAuth: () => { },
    removeAuth: () => { },
};

export default authContextInitialState;