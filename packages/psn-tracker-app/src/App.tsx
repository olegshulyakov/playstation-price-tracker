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
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./App.css";
import { clearGamesStore, fetchStoreInfo } from "./actions/gameActions";
import LoadingSpinner from "./components/LoadingSpinner";
import { fetchRegions } from "./actions/regionActions";

interface Props extends PropsFromRedux, RouteComponentProps, React.HTMLProps<any> {}

const App: React.FC<Props> = ({ region, store, fetchRegions, fetchStoreInfo, clearGamesStore, history }: Props) => {
    const isLoaded = store.info && store.previews;

    const fetchInfo = () => {
        if (!region.current) {
            return;
        }

        if (!store.info) {
            fetchStoreInfo(region.current);
            return;
        }
    };

    React.useEffect(() => {
        if (!region.regions || region.regions.length === 0) {
            fetchRegions();
        }
    }, []);

    React.useEffect(() => {
        if (!isLoaded) {
            clearGamesStore();
        }
        fetchInfo();
    }, [region.current]);

    if (!region.regions || region.regions.length === 0) {
        return <LoadingSpinner />;
    }

    if (!region.current || !region.current.name) {
        history.push("/selectregion");
    }

    if (!isLoaded) {
        return <LoadingSpinner msg={<p>Loading games...</p>} />;
    }
    history.push("/discounts");

    return <></>;
};

const mapStateToProps = (state: ReduxStoreState) => ({
    region: state.region,
    store: state.store,
});

const mapDispatchToProps = {
    fetchRegions,
    fetchStoreInfo,
    clearGamesStore,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(App));
