import React from "react";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="App-footer">
                <p>
                    Version <b>{process.env.REACT_APP_VERSION}</b>
                </p>
            </footer>
        );
    }
}
