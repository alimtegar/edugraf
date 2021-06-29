// Components
import Home from './components/Home';
import Characters from './components/Characters';
import Character from './components/Character';
import Stages from './components/Stages';
import AttemptedQuestion from './components/AttemptedQuestion';
import AttemptedStage from './components/AttemptedStage';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
import Activate from './components/Activate';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import Practice from './components/Practice';
import Leaderboard from './components/Leaderboard';

// Types
import ProtectedRoute from './types/ProtectedRoute';

const routes: ProtectedRoute[] = [
    {
        exact: true,
        path: '/',
        renderedComponent: Home,
        visibility: 'user',
    },
    {
        exact: true,
        path: '/characters/category/:category/:character',
        renderedComponent: Character,
        visibility: 'user',
    },
    {
        exact: true,
        path: '/characters/category/:category',
        renderedComponent: Characters,
        visibility: 'user',
    },
    {
        exact: true,
        path: '/stages/category/:category',
        renderedComponent: Stages,
        visibility: 'user',
    },
    {
        exact: true,
        path: '/attempted-stages/:attemptedStageId/attempted-questions/n/:n',
        renderedComponent: AttemptedQuestion,
        visibility: 'user',
    },
    {
        exact: true,
        path: '/attempted-stages/:id',
        renderedComponent: AttemptedStage,
        visibility: 'user',
    },
    {
        exact: true,
        path: '/404',
        renderedComponent: NotFound,
        visibility: 'user',
    },
    {
        exact: true,
        path: '/register',
        renderedComponent: Register,
        visibility: 'guest',
    },
    {
        exact: true,
        path: '/login',
        renderedComponent: Login,
        visibility: 'guest',
    },
    {
        exact: true,
        path: '/activate/:token',
        renderedComponent: Activate,
        visibility: 'guest',
    },
    {
        exact: true,
        path: '/edit-profile',
        renderedComponent: EditProfile,
        visibility: 'user',
    },
    {
        exact: true,
        path: '/change-password',
        renderedComponent: ChangePassword,
        visibility: 'user',
    },
    {
        exact: true,
        path: '/practice/category/:category/:character',
        renderedComponent: Practice,
        visibility: 'user',
    },
    {
        exact: true,
        path: '/leaderboard',
        renderedComponent: Leaderboard,
        visibility: 'user',
    },
];

export default routes;