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
import { connect } from "react-redux";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import SelectRegion from "./pages/SelectRegion";
import { fetchStoreInfo, fetchGamePreviewsList, clearGamesStore } from "./actions/gameActions";
import LoadingSpinner from "./components/LoadingSpinner";
import { fetchRegions } from "./actions/regionActions";
import { DEFAULT_FETCH_SIZE } from "./services/Playstation/constants";

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
`;

const LoadingLabel = styled.label`
    margin: 2rem 0rem 0.25rem 0rem;
`;

const LoadingProgress = styled.progress`
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
`;

interface AppProps extends ReduxStoreState {
    fetchRegions: Function;
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
            return DEFAULT_FETCH_SIZE <= this.props.store.previews.length;
        }
        return this.props.store.info.total_results <= this.props.store.previews.length;
    }

    fetchInfo() {
        if (!this.props.region.current) {
            return;
        }

        if (!this.props.store.info) {
            const region = this.props.region.current;
            this.props.fetchInfo(region);
            return;
        }

        if (!this.props.store.previews) {
            this.props.fetchGames(this.props.region.current, this.props.store.info.total_results, 0);
            return;
        }

        if (!this.isLoaded()) {
            this.props.fetchGames(
                this.props.region.current,
                this.props.store.info.total_results,
                this.props.store.previews.length,
            );
        }
    }

    componentDidMount() {
        if (!this.props.region.regions || this.props.region.regions.length === 0) {
            this.props.fetchRegions();
        }

        if (!this.isLoaded()) {
            this.props.clearStore();
        }
        this.fetchInfo();
    }

    componentDidUpdate() {
        this.fetchInfo();
    }

    render() {
        if (!this.props.region.regions || this.props.region.regions.length === 0) {
            return <LoadingSpinner />;
        }

        if (!this.props.region.current || !this.props.region.current.name) {
            return (
                <AppContainer>
                    <Header />
                    <SelectRegion />
                    <Footer />
                </AppContainer>
            );
        }

        if (!this.props.store.info || !this.props.store.previews || !this.isLoaded()) {
            let msg = <p>Loading games...</p>;
            if (this.props.store.info && this.props.store.previews) {
                msg = (
                    <>
                        <LoadingLabel>
                            {`Loading games... ${this.props.store.previews.length} / ${this.props.store.info.total_results}`}
                        </LoadingLabel>
                        <LoadingProgress
                            max={this.props.store.info.total_results}
                            value={this.props.store.previews.length}
                        ></LoadingProgress>
                    </>
                );
            }
            return (
                <AppContainer>
                    <LoadingSpinner msg={msg} />
                </AppContainer>
            );
        }

        return (
            <AppContainer>
                <Header isSearchEnabled={true} isLanguageEnabled={true} />
                <Store />
                <Footer />
            </AppContainer>
        );
    }
}

const mapStateToProps = (state: ReduxStoreState) => state;

export default connect(mapStateToProps, {
    fetchRegions: fetchRegions,
    fetchInfo: fetchStoreInfo,
    fetchGames: fetchGamePreviewsList,
    clearStore: clearGamesStore,
})(App);
