// Components
import AuthContextProvider from './components/AuthContextProvider';
import Layout from './components/Layout';

const App = () => (
    <AuthContextProvider>
        <Layout />
    </AuthContextProvider>
);

export default App;
