import Auth from './Auth';

type AuthContext = Auth & {
    setAuth: (data: Auth) => void,
    removeAuth: () => void,
};

export default AuthContext;