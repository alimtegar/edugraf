// Components
import { AuthContextProvider } from './contexts/AuthContext';
import { CharacterContextProvider } from './contexts/CharacterContext';
import { SidebarContextProvider } from './contexts/SidebarContext';
import Wrapper from './components/Wrapper';

const App = () => (
    <AuthContextProvider>
        <CharacterContextProvider>
            <SidebarContextProvider>
                <Wrapper />
            </SidebarContextProvider>
        </CharacterContextProvider>
    </AuthContextProvider>
);

export default App;
