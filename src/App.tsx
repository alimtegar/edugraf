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
import Test from './components/Test';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col w-screen min-h-screen overflow-hidden">
                <Navbar />
                <Switch>
                    <Route 
                        exact 
                        path="/"
                        render={() => (<Home />)} 
                    />
                    <Route 
                        exact 
                        path="/characters/:characterType/:character"
                        render={(props: any) => (<Character {...props} />)} 
                    />
                    <Route 
                        exact 
                        path="/characters/:characterType"
                        render={(props: any) => (<Characters {...props} />)} 
                    />
                    
                    {/*  */}
                    <Redirect 
                        exact
                        from="/tests" 
                        to="/tests/1/1" 
                    />
                    {/*  */}
                    <Redirect 
                        exact
                        from="/tests/:id" 
                        to="/tests/:id/1" 
                    />
                    <Route
                        exact
                        path="/tests/:id/:page"
                        render={(props: any) => (<Test {...props} />)}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
