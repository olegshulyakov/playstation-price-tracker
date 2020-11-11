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

interface Props extends ReduxStoreState, RouteComponentProps, React.HTMLProps<any> {
    fetchRegions: Function;
    fetchInfo: Function;
    fetchGames: Function;
    clearStore: Function;
}

const App: React.FC<Props> = (props: Props) => {
    const isLoaded = !(!props.store.info || !props.store.previews);

    const fetchInfo = () => {
        if (!props.region.current) {
            return;
        }

        if (!props.store.info) {
            const region = props.region.current;
            props.fetchInfo(region);
            return;
        }

        if (!isLoaded) {
            props.fetchGames(props.region.current, props.store.info.total_results);
        }
    };

    React.useEffect(() => {
        if (!props.region.regions || props.region.regions.length === 0) {
            props.fetchRegions();
        }

        if (!isLoaded) {
            props.clearStore();
        }
        fetchInfo();
    }, []);

    React.useEffect(() => {
        if (isLoaded) {
            props.history.push("/discounts");
        }
    }, [isLoaded, props.store]);

    if (!props.region.regions || props.region.regions.length === 0) {
        return <LoadingSpinner/>;
    }

    if (!props.region.current || !props.region.current.name) {
        props.history.push("/selectregion");
    }

    if (!isLoaded) {
        return <LoadingSpinner msg={<p>Loading games...</p>}/>;
    }

    return <></>;
};

const mapStateToProps = (state: ReduxStoreState) => state;
const mapDispatchToProps = {
    fetchRegions: fetchRegions,
    fetchInfo: fetchStoreInfo,
    fetchGames: fetchGamePreviewsList,
    clearStore: clearGamesStore,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
