import { useReducer } from "react";
import AuthContext from "../contexts/AuthContext";
import AuthReducer from "../reducers/AuthReducer";

// Initial state
import authContextInitialState from "../initial-states/authContextInitialState";

// Types
import Auth from '../types/Auth';

type Props = {
    children: JSX.Element
}

const AuthContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(AuthReducer, authContextInitialState);

    const setAuth = (data: Auth) => dispatch({
        type: 'SET_AUTH',
        payload: data,
    });
    const removeAuth = () => dispatch({
        type: 'REMOVE_AUTH',
    });

    return (
        <AuthContext.Provider value={{ ...state, setAuth, removeAuth, }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;