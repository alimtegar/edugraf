import { createContext, useReducer, useContext, } from "react";

// Types
import Auth from '../types/Auth';
import { default as AuthContextState } from '../types/AuthContext';

type Props = {
  children: JSX.Element
}

type Action =
  | { type: 'SET_AUTH', payload: Auth }
  | { type: 'REMOVE_AUTH' }


// Initial states
const initState: AuthContextState = {
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


// Actions
const setAuth = (data: Auth, state: AuthContextState) => {
  localStorage.setItem('auth', JSON.stringify(data))

  return {
    ...state,
    ...data,
  };
};

const removeAuth = (state: AuthContextState) => {
  localStorage.setItem('auth', JSON.stringify('auth'))

  return {
    ...state,
    ...initState
  };
};

// Reducer
const AuthReducer = (state: AuthContextState, action: Action) => {
  switch (action.type) {
    case "SET_AUTH":
      return setAuth(action.payload, state);
    case "REMOVE_AUTH":
      return removeAuth(state);
    default:
      return state;
  }
};

// Context
const AuthContext = createContext(initState);

// Provider
const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, initState);

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

function useAuthContext() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }

  return context
}

export {
  AuthContextProvider,
  useAuthContext,
};