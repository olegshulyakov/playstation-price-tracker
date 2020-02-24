import React from "react";
import "./App.css";
import Store from "./pages/Store";

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
            <Store language="ru" country="ru" />
        </div>
    );
}

export default App;
