import React from "react";

export default class SelectRegion extends React.Component {
    render() {
        // TODO parse regions from https://www.playstation.com/country-selector/index.html
        fetch("https://www.playstation.com/country-selector/index.html", {
            mode: "cors",
            cache: "reload",
            credentials: "omit",
        })
            .then((response) => {
                return response.text();
            })
            .then((text) => {
                console.debug(text);
            });

        return (
            <div className="select-region">
                <img
                    className="select-region-logo"
                    src="https://www.playstation.com/country-selector/img/logotype/logo_PS.svg"
                    alt="PS logo"
                    loading="lazy"
                    placeholder="Playstation logo"
                ></img>
                <h1>Please select your country / region</h1>
            </div>
        );
    }
}
