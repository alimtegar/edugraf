import { createContext } from "react";

// Initial states
import authContextInitialState from '../initial-states/authContextInitialState';

const AuthContext = createContext(authContextInitialState);

export default AuthContext;