// Components
import { AuthContextProvider } from './contexts/AuthContext';
import { CharacterContextProvider } from './contexts/CharacterContext';
import Layout from './components/Layout';

const App = () => (
    <AuthContextProvider>
        <CharacterContextProvider>
            <Layout />
        </CharacterContextProvider>
    </AuthContextProvider>
);

export default App;
