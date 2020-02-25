import React from "react";

export default class Header extends React.Component {
    render() {
        return (
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
        );
    }
}
