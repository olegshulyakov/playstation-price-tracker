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

import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";
import LanguageMenu from "./LanguageMenu";
import Search from "./Search";

const HeaderContainer = styled.header`
    position: fixed;
    z-index: 1;
    color: var(--text-secondary);
    background-color: var(--bg-secondary);
    width: 100%;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;

    @media only screen and (max-width: 600px) {
        bottom: 0;
    }
`;

const HeaderTitle = styled.h2`
    cursor: pointer;
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;

    @media only screen and (max-width: 600px) {
        display: none;
    }
`;

interface HeaderProps extends RouteComponentProps {
    isSearchEnabled?: boolean;
    isLanguageEnabled?: boolean;
}

class Header extends React.Component<HeaderProps> {
    render() {
        return (
            <HeaderContainer>
                <FontAwesomeIcon style={{ margin: "0 0.5rem 0 0.5rem" }} icon={faPlaystation} size="2x"/>
                <HeaderTitle
                    className="App-title"
                    onClick={() => {
                        this.props.history.push("/");
                    }}
                >
                    PSN tracker
                </HeaderTitle>
                {this.props.isSearchEnabled ? (
                    <Search/>
                ) : (
                    <></>
                )}

                {this.props.isLanguageEnabled ? <LanguageMenu/> : <></>}
            </HeaderContainer>
        );
    }
}

export default withRouter(Header);
