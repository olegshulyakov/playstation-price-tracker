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
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./App.css";
import { clearGamesStore, fetchGamePreviewsList, fetchStoreInfo } from "./actions/gameActions";
import LoadingSpinner from "./components/LoadingSpinner";
import { fetchRegions } from "./actions/regionActions";

interface AppProps extends ReduxStoreState, RouteComponentProps {
    fetchRegions: Function;
    fetchInfo: Function;
    fetchGames: Function;
    clearStore: Function;
}

class App extends React.Component<AppProps> {
    isLoaded() {
        return !(!this.props.store.info || !this.props.store.previews);
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

        if (!this.isLoaded()) {
            this.props.fetchGames(this.props.region.current, this.props.store.info.total_results);
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

        if (this.isLoaded()) {
            this.props.history.push("/discounts");
        }
    }

    render() {
        if (!this.props.region.regions || this.props.region.regions.length === 0) {
            return <LoadingSpinner />;
        }

        if (!this.props.region.current || !this.props.region.current.name) {
            this.props.history.push("/selectregion");
        }

        if (!this.isLoaded()) {
            return <LoadingSpinner msg={<p>Loading games...</p>} />;
        }

        return <></>;
    }
}

const mapStateToProps = (state: ReduxStoreState) => state;
const mapDispatchToProps = {
    fetchRegions: fetchRegions,
    fetchInfo: fetchStoreInfo,
    fetchGames: fetchGamePreviewsList,
    clearStore: clearGamesStore,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
