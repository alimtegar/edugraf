import { useContext, } from 'react';
import { Redirect, Route, } from "react-router-dom";

// Contexts
import AuthContext from '../contexts/AuthContext';

// Types
import ProtectedRoute from '../types/ProtectedRoute';

const ProtectedRouteComponent = ({ renderedComponent: RenderedComponent, path, visibility, ...props }: ProtectedRoute) => {
    // Context
    const authContext = useContext(AuthContext);

    return ((visibility === 'user') === !!authContext.token.token) ? (
        <Route
            path={path}
            render={(props) => (<RenderedComponent {...props} />)}
            {...props}
        />
    ) : (
        <Redirect to={(visibility === 'user') ? '/login' : '/'} />
    );
};

export default ProtectedRouteComponent;