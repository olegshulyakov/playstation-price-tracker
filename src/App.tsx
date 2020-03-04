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
import { Switch, Route } from "react-router-dom";
import { PlaystationRegion } from "playstation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import SelectRegion from "./pages/SelectRegion";
import { connect } from "react-redux";
import { fetchStoreInfo, fetchGamesList } from "./actions/gameActions";
import LoadingSpinner from "./components/LoadingSpinner";

interface AppProps {
    region: PlaystationRegion;
    store: StoreState;
    fetchInfo: Function;
    fetchGames: Function;
}

class App extends React.Component<AppProps> {
    fetchInfo() {
        if (this.props.region && !this.props.store.info) {
            const region = this.props.region;
            this.props.fetchInfo(region.language, region.country);
        }

        if (this.props.region && this.props.store.info && !this.props.store.games) {
            const region = this.props.region;
            this.props.fetchGames(region.language, region.country);
        }
    }

    componentDidMount() {
        this.fetchInfo();
    }

    componentDidUpdate() {
        this.fetchInfo();
    }

    render() {
        if (!this.props.region || !this.props.region.name) {
            return (
                <div className="App">
                    <Header />
                    <SelectRegion />
                    <Footer />
                </div>
            );
        }

        if (!this.props.store.info || !this.props.store.games) {
            return (
                <div className="App">
                    <LoadingSpinner msg="Loading games..." />
                </div>
            );
        }

        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/" exact component={() => <Store />} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state: ReduxStoreState) => state;

export default connect(mapStateToProps, { fetchInfo: fetchStoreInfo, fetchGames: fetchGamesList })(App);
