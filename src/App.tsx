import { useState, useEffect } from 'react';
// import Tesseract from 'tesseract.js';
import SignatureCanvas from 'react-signature-canvas'
import {
    BrowserRouter as Router,
    Switch,
    Route,
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
                    <Route
                        exact
                        path="/tests/:id/:page"
                        render={(props: any) => (
                            <Test
                                // recognize={recognize}
                                // canvasRef={canvasRef}
                                // setCanvasRef={setCanvasRef}
                                {...props}
                            />
                        )}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
