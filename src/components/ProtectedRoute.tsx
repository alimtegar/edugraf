import { Redirect, Route, } from "react-router-dom";

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Components
import Loading from "./Loading";

// Types
import { default as ProtectedRouteProps } from '../types/ProtectedRoute';

const ProtectedRoute = ({ renderedComponent: RenderedComponent, path, visibility, ...props }: ProtectedRouteProps) => {
    // Context
    const authContext = useAuthContext();

    console.log(authContext);

    if (authContext.isLoading) {
        // Loading
        return (<Loading />)
    } else {
        // Pass
        return ((visibility === 'user') === !!authContext.token.token) ? (
            <Route
                path={path}
                render={(props) => (<RenderedComponent {...props} />)}
                {...props}
            />
        ) : (
            <Redirect to={(visibility === 'user') ? '/login' : '/'} />
        );
    }
};

export default ProtectedRoute;