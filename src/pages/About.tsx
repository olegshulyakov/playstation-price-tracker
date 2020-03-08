/*
 * Copyright 2020 Oleg Shulyakov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import "./About.css";
import React from "react";
import playstationClassicIcon from "../assets/playstation-classic.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";

class About extends React.Component {
    render() {
        return (
            <div className="About-landing-page">
                <Header />
                <div className="About-landing-container">
                    <h3>About page</h3>

                    <p className="description">{process.env.REACT_APP_WEBSITE_DESCRIPTION}</p>

                    <p className="thanks">We want to thanks people who helped on work with this resource.</p>

                    <p className="technologies">
                        <h4>Technology stack:</h4>
                        <ul>
                            <li>
                                <a
                                    className="link"
                                    href="https://reactjs.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    React
                                </a>
                            </li>
                            <li>
                                <a
                                    className="link"
                                    href="https://redux.js.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Redux
                                </a>
                            </li>
                            <li>
                                <a
                                    className="link"
                                    href="https://material-ui.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Material UI
                                </a>
                            </li>
                            <li>
                                <a
                                    className="link"
                                    href="https://fontawesome.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Font Awesome
                                </a>
                            </li>
                        </ul>
                    </p>

                    <p>
                        <h4>Attribution:</h4>
                        <img src={playstationClassicIcon} height={16} width={16} alt="Playstation Classic icon" />{" "}
                        Classic Playstation Icon is made by{" "}
                        <a
                            className="link"
                            href="https://www.flaticon.com/authors/freepik"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Freepik
                        </a>{" "}
                        from{" "}
                        <a className="link" href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer">
                            Flaticon
                        </a>
                        .
                    </p>
                </div>

                <Footer />
            </div>
        );
    }
}

export default About;
