// Initial states
import authContextInitialState from '../initial-states/authContextInitialState';

// Types
import Auth from '../types/Auth';
import AuthContext from '../types/AuthContext';

type Action =
  | { type: 'SET_AUTH', payload: Auth }
  | { type: 'REMOVE_AUTH' }


const setAuth = (data: Auth, state: AuthContext) => {
  localStorage.setItem('auth', JSON.stringify(data))

  return {
    ...state,
    ...data,
  };
};

const removeAuth = (state: AuthContext) => {
  localStorage.setItem('auth', JSON.stringify('auth'))

  return {
    ...state,
    ...authContextInitialState
  };
};

const UserReducer = (state: AuthContext, action: Action) => {
  switch (action.type) {
    case "SET_AUTH":
      return setAuth(action.payload, state);
    case "REMOVE_AUTH":
      return removeAuth(state);
    default:
      return state;
  }
};

export default UserReducer;