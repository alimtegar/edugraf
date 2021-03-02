import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Test from './components/Test';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col w-screen min-h-screen overflow-hidden">
                <Navbar />
                <Switch>
                    {/* Remove this if homepage has been created */}
                    <Route 
                        exact 
                        path="/"
                        render={() => (<Home />)} 
                    />
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
