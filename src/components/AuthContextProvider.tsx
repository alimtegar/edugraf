import { useReducer } from "react";
import AuthContextComponent from "../contexts/AuthContext";
import AuthReducer from "../reducers/AuthReducer";

// Types
import Auth from '../types/Auth';
import AuthContext from '../types/AuthContext';

type Props = {
    children: JSX.Element
}

const AuthContextProvider = ({ children }: Props) => {
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
        setAuth: () => { },
        removeAuth: () => { },
    };
    const [state, dispatch] = useReducer(AuthReducer, initState);

    const setAuth = (data: Auth) => dispatch({
        type: 'SET_AUTH',
        payload: data,
    });
    const removeAuth = () => dispatch({
        type: 'REMOVE_AUTH',
    });

    return (
        <AuthContextComponent.Provider value={{ ...state, setAuth, removeAuth, }}>
            {console.log({ ...state, setAuth, removeAuth, })}
            {children}
        </AuthContextComponent.Provider>
    );
};

export default AuthContextProvider;