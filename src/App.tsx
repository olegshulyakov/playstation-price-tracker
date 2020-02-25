import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Store from "./pages/Store";
import GameDetail from "./pages/GameDetail";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    <a
                        className="App-link"
                        href="https://store.playstation.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        PS Store
                    </a>{" "}
                    tracker.
                </p>
            </header>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={() => <Store language="ru" country="ru" />} />
                    <Route path="/game/:cusa" component={GameDetail} />
                </Switch>
            </BrowserRouter>
            <footer className="App-footer">
                <p>
                    Version <b>{process.env.REACT_APP_VERSION}</b>
                </p>
            </footer>
        </div>
    );
}

export default App;
