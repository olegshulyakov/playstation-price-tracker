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
import { Nav } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";
import LanguageMenu from "./LanguageMenu";
import Search from "../Search";

interface Props extends RouteComponentProps, React.HTMLProps<any> {
    isLanguageEnabled?: boolean;
    isSearchEnabled?: boolean;
}

const Header: React.FC<Props> = (props: Props) => {
    return (
        <header className="d-flex flex-column flex-md-row align-items-center bg-white border-bottom shadow-sm p-1">
            <FontAwesomeIcon
                style={{ margin: "0 0.5rem 0 0.5rem" }}
                icon={faPlaystation}
                size="2x"
                onClick={() => {
                    props.history.push("/");
                }}
            />

            <Nav className="justify-content-center mr-auto" defaultActiveKey="/">
                {/*<Nav.Item>
                    <Nav.Link
                        className="text-dark"
                        onClick={() => {
                            props.history.push("/search");
                        }}
                    >
                        Search
                    </Nav.Link>
                </Nav.Item>*/}
                <Nav.Item>
                    <Nav.Link
                        className="text-dark"
                        onClick={() => {
                            props.history.push("/discounts");
                        }}
                    >
                        Discounts
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        className="text-dark"
                        onClick={() => {
                            props.history.push("/allgames");
                        }}
                    >
                        All Games
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        className="text-dark"
                        disabled
                        onClick={() => {
                            props.history.push("/wishlist");
                        }}
                    >
                        Wishlist
                    </Nav.Link>
                </Nav.Item>
                {props.isSearchEnabled ? <Nav.Item><Search/></Nav.Item> : <></>}
            </Nav>

            {props.isLanguageEnabled ? <LanguageMenu/> : <></>}
        </header>
    );
};

export default withRouter(Header);
