import Auth from './Auth';
import User from './User';

type AuthContext = Auth & {
    setAuth: (data: Auth) => void,
    setAuthLoading: (data: boolean) => void,
    setAuthUser: (data: User) => void,
    removeAuth: () => void,
    isLoading: boolean,
};

export default AuthContext;