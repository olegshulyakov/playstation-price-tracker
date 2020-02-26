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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";

export default class Header extends React.Component {
    render() {
        return (
            <header className="App-header">
                <p>
                    <FontAwesomeIcon icon={faPlaystation} size="2x" />
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
