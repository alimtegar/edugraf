// Components
import { AuthContextProvider } from './contexts/AuthContext';
import { CharacterContextProvider } from './contexts/CharacterContext';
import { SidebarContextProvider } from './contexts/SidebarContext';
import Wrapper from './components/Wrapper';
import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

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
