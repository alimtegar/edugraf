import { createContext, useReducer, useContext, } from "react";
import axios from 'axios';

// Types
import Auth from '../types/Auth';
import User from '../types/User';
import { default as AuthContextState } from '../types/AuthContext';

type Props = {
  children: JSX.Element
}

type Action =
  | { type: 'SET_AUTH', payload: Auth, }
  | { type: 'SET_AUTH_LOADING', payload: boolean, }
  | { type: 'SET_AUTH_USER', payload: User, }
  | { type: 'REMOVE_AUTH', }


// Initial states
const initState: AuthContextState = {
  user: {
    id: 0,
    name: '',
    email: '',
    photo: '',
    xp: 0,
  },
  token: {
    token: '',
    type: '',
  },
  loginWith: '',
  setAuth: () => { },
  setAuthLoading: () => { },
  setAuthUser: () => { },
  removeAuth: () => { },
  isLoading: true,
};


// Actions
const setAuth = (data: Auth, state: AuthContextState) => {
  localStorage.setItem('auth', JSON.stringify(data))
  axios.defaults.headers.common['Authorization'] = `${data.token.type} ${data.token.token}`;

  return {
    ...state,
    ...data,
  };
};

const setAuthLoading = (data: boolean, state: AuthContextState) => {
  return {
    ...state,
    isLoading: data,
  };
};

const setAuthUser = (data: User, state: AuthContextState) => {
  const authContext: AuthContextState = {
    ...state,
    user: {
      ...state.user,
      ...data,
    },
  };

  localStorage.setItem('auth', JSON.stringify(authContext))

  return authContext;
};

const removeAuth = (state: AuthContextState) => {
  localStorage.removeItem('auth');
  localStorage.removeItem('is-motoric-gym-watched');
  delete axios.defaults.headers.common["Authorization"];

  return {
    ...state,
    ...initState,
  };
};

// Reducer
const AuthReducer = (state: AuthContextState, action: Action) => {
  switch (action.type) {
    case "SET_AUTH":
      return setAuth(action.payload, state);
    case "SET_AUTH_LOADING":
      return setAuthLoading(action.payload, state);
    case "SET_AUTH_USER":
      return setAuthUser(action.payload, state);
    case "REMOVE_AUTH":
      return removeAuth(state);
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextState | undefined>(undefined);

// Provider
const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, initState);

  const setAuth = (data: Auth) => dispatch({
    type: 'SET_AUTH',
    payload: data,
  });
  const setAuthLoading = (data: boolean) => dispatch({
    type: 'SET_AUTH_LOADING',
    payload: data,
  });
  const setAuthUser = (data: User) => dispatch({
    type: 'SET_AUTH_USER',
    payload: data,
  });
  const removeAuth = () => dispatch({
    type: 'REMOVE_AUTH',
  });

  return (
    <AuthContext.Provider value={{ ...state, setAuth, setAuthLoading, setAuthUser, removeAuth, }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  const authContext = useContext(AuthContext)

  if (authContext === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }

  return authContext;
}

export {
  AuthContextProvider,
  useAuthContext,
};