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
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import LanguageMenu from "./LanguageMenu";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface HeaderProps extends RouteComponentProps {}

class Header extends React.Component<HeaderProps> {
    render() {
        return (
            <AppBar position="static" className="App-header">
                <Toolbar variant="dense" disableGutters={true} className="App-header-toolbar">
                    <FontAwesomeIcon className="App-logo" icon={faPlaystation} size="2x" />
                    <Typography
                        className="App-title"
                        variant="h6"
                        color="inherit"
                        noWrap
                        onClick={() => {
                            this.props.history.push("/");
                        }}
                    >
                        PSN tracker
                    </Typography>
                    <LanguageMenu />
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(Header);
