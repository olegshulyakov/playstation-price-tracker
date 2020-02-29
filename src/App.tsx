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
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { PlaystationRegion } from "playstation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import GameDetail from "./pages/GameDetail";
import SelectRegion from "./pages/SelectRegion";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./theme";

interface AppState {
    region: PlaystationRegion | undefined;
}

export default class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);

        let storedRegion: PlaystationRegion | undefined = undefined;
        const storedRegionStr = localStorage.getItem("region");
        if (storedRegionStr) {
            try {
                storedRegion = JSON.parse(storedRegionStr);
            } catch (e) {
                storedRegion = undefined;
            }
        }
        this.state = {
            region: storedRegion,
        };
        this.onSelectRegion = this.onSelectRegion.bind(this);
    }

    onSelectRegion(region: PlaystationRegion) {
        console.debug(`Changing region from ${this.state.region?.name} to ${region.name}`);
        localStorage.setItem("region", JSON.stringify(region));
        this.setState({ region: region });
    }

    render() {
        if (!this.state.region) {
            return (
                <MuiThemeProvider theme={theme}>
                    <div className="App">
                        <Header onSelectRegion={(region: PlaystationRegion) => this.onSelectRegion(region)} />
                        <SelectRegion onSelectRegion={(region: PlaystationRegion) => this.onSelectRegion(region)} />
                        <Footer />
                    </div>
                </MuiThemeProvider>
            );
        }
        const region = this.state.region;
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <BrowserRouter>
                        <Header onSelectRegion={(region: PlaystationRegion) => this.onSelectRegion(region)} />
                        <Switch>
                            <Route path="/" exact component={() => <Store region={region} />} />
                            <Route path="/game/:cusa" component={() => <GameDetail region={region} />} />
                        </Switch>
                        <Footer />
                    </BrowserRouter>
                </div>
            </MuiThemeProvider>
        );
    }
}
