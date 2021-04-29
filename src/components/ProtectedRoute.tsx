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

    if (authContext.isLoading) {
        // Loading
        return (<Loading />);
    } else {
        // Pass
        if ((visibility === 'user') === !!authContext.token.token) {
            return (
                <Route
                    path={process.env.PUBLIC_URL + path}
                    render={(props) => (<RenderedComponent {...props} />)}
                    {...props}
                />
            );
        } else {
            return (<Redirect to={(visibility === 'user') ? '/login' : '/'} />);
        }
    }
};

export default ProtectedRoute;