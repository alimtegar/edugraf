import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Characters from './components/Characters';
import Character from './components/Character';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col w-screen min-h-screen overflow-hidden">
                <Navbar />
                <Switch>
                    {/* Home Page */}
                    <Route 
                        exact 
                        path="/"
                        render={() => (<Home />)} 
                    />
                    {/* Character Page */}
                    <Route 
                        exact 
                        path="/characters/category/:category/:character"
                        render={(props: any) => (<Character {...props} />)} 
                    />
                    <Route 
                        exact 
                        path="/characters/category/:category"
                        render={(props: any) => (<Characters {...props} />)} 
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
