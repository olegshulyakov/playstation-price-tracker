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
import { Link } from "react-router-dom";
import { FooterContainer } from "./styles";

interface Props extends React.HTMLProps<any> {}

const Footer: React.FC<Props> = (props: Props) => {
    return (
        <FooterContainer className={props.className} style={props.style}>
            <Link className="link" to="/about">
                About
            </Link>
            {". "}
            <a className="link" href="https://github.com/olegshulyakov/playstation-price-tracker" target="_blank" rel="noopener noreferrer">
                GitHub
            </a>
            {". "} Version: <b>{process.env.REACT_APP_VERSION}</b>
        </FooterContainer>
    );
};

export default Footer;
