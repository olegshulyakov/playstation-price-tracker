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
import { PlaystationRegion } from "playstation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import SelectRegion from "./pages/SelectRegion";
import { connect } from "react-redux";
import { fetchStoreInfo, fetchGamePreviewsList, clearGamesStore } from "./actions/gameActions";
import LoadingSpinner from "./components/LoadingSpinner";

interface AppProps {
    region: PlaystationRegion;
    store: PlaystationStore;
    fetchInfo: Function;
    fetchGames: Function;
    clearStore: Function;
}

class App extends React.Component<AppProps> {
    isLoaded() {
        if (!this.props.store.info || !this.props.store.previews) {
            return false;
        }

        if (process.env.NODE_ENV === "development") {
            return 100 <= this.props.store.previews.length;
        }
        return this.props.store.info.total_results <= this.props.store.previews.length;
    }

    fetchInfo() {
        if (!this.props.region) {
            return;
        }

        if (!this.props.store.info) {
            const region = this.props.region;
            this.props.fetchInfo(region);
            return;
        }

        if (!this.props.store.previews) {
            this.props.fetchGames(this.props.region, this.props.store.info.total_results, 0);
            return;
        }

        if (!this.isLoaded()) {
            this.props.fetchGames(
                this.props.region,
                this.props.store.info.total_results,
                this.props.store.previews.length,
            );
        }
    }

    componentDidMount() {
        if (!this.isLoaded()) {
            this.props.clearStore();
        }
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

        if (!this.props.store.info || !this.props.store.previews || !this.isLoaded()) {
            let msg = <p>Loading games...</p>;
            if (this.props.store.info && this.props.store.previews) {
                msg = (
                    <>
                        <label style={{ margin: "2rem 0rem 0.25rem 0rem" }}>
                            {`Loading games... ${this.props.store.previews.length} / ${this.props.store.info.total_results}`}
                        </label>
                        <progress
                            className="App-loading-progress"
                            max={this.props.store.info.total_results}
                            value={this.props.store.previews.length}
                        ></progress>
                    </>
                );
            }
            return (
                <div className="App">
                    <LoadingSpinner msg={msg} />
                </div>
            );
        }

        return (
            <div className="App">
                <Header isSearchEnabled={true} isLanguageEnabled={true} />
                <Store />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state: ReduxStoreState) => state;

export default connect(mapStateToProps, {
    fetchInfo: fetchStoreInfo,
    fetchGames: fetchGamePreviewsList,
    clearStore: clearGamesStore,
})(App);
