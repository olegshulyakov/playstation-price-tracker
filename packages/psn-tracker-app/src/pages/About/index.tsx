/*
 * Copyright (c) 2020. Oleg Shulyakov
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

import React from "react";
import playstationClassicIcon from "../../assets/playstation-classic.svg";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AboutContainer, AboutContent, ExternalLink } from "./styles";

interface Props extends React.HTMLProps<any> {}

const About: React.FC<Props> = (props: Props) => {
    return (
        <AboutContainer className={props.className} style={props.style}>
            <Header />
            <AboutContent>
                <h3>About page</h3>

                <p className="description">{process.env.REACT_APP_WEBSITE_DESCRIPTION}</p>

                <p className="thanks">We want to thanks people who helped on work with this resource.</p>

                <p className="technologies">
                    <b>Technology stack:</b>
                </p>
                <ul>
                    <li>
                        <ExternalLink href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                            React
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
                            Redux
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://styled-components.com/" target="_blank" rel="noopener noreferrer">
                            Styled Components
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">
                            Material UI
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">
                            Font Awesome
                        </ExternalLink>
                    </li>
                </ul>
                <p>
                    <b>Attribution:</b>
                </p>
                <p>
                    <img src={playstationClassicIcon} height={16} width={16} alt="Playstation Classic icon" /> Classic Playstation Icon is made by{" "}
                    <ExternalLink href="https://www.flaticon.com/authors/freepik" target="_blank" rel="noopener noreferrer">
                        Freepik
                    </ExternalLink>{" "}
                    from{" "}
                    <ExternalLink href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer">
                        Flaticon
                    </ExternalLink>
                    .
                </p>
            </AboutContent>

            <Footer />
        </AboutContainer>
    );
};

export default About;
