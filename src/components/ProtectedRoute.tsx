import { Redirect, Route, } from "react-router-dom";

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Types
import { default as ProtectedRouteProps } from '../types/ProtectedRoute';

const ProtectedRoute = ({ renderedComponent: RenderedComponent, path, visibility, ...props }: ProtectedRouteProps) => {
    // Context
    const authContext = useAuthContext();

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

export default ProtectedRoute;