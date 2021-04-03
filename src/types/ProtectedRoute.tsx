import { WithRouterStatics } from 'react-router';
import { RouteProps, RouteComponentProps } from 'react-router-dom';

type ProtectedRoute = RouteProps & {
    exact: boolean,
    path: string,
    renderedComponent: ((props: RouteComponentProps) => JSX.Element) | (React.ComponentClass<Pick<RouteComponentProps, never>> & WithRouterStatics<(props: RouteComponentProps<object>) => JSX.Element>)
    visibility: 'user' | 'guest' | 'all',
};

export default ProtectedRoute;