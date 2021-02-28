import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

// Components
import Navbar from './components/Navbar';
import Test from './components/Test';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <Switch>
                    {/* Remove this if homepage has been created */}
                    <Redirect 
                        exact
                        from="/" 
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
