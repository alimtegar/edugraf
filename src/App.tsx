// Components
import { AuthContextProvider } from './contexts/AuthContext';
import Layout from './components/Layout';

const App = () => (
    <AuthContextProvider>
        <Layout />
    </AuthContextProvider>
);

export default App;
