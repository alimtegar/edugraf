// Components
import { AuthContextProvider } from './contexts/AuthContext';
import { CharacterContextProvider } from './contexts/CharacterContext';
import { SidebarContextProvider } from './contexts/SidebarContext';
import Wrapper from './components/Wrapper';
import axios from 'axios';
import numeral from 'numeral';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Localize Numeral
numeral.register('locale', 'id', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'Rb',
        million: 'Jt',
        billion: 'M',
        trillion: 'T'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: 'Rp'
    }
});
numeral.locale('id');

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
