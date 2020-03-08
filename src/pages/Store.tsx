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

import "./Store.css";
import React from "react";
import { connect } from "react-redux";
import GamePreview from "../components/GamePreview";
import InfiniteScroll from "react-infinite-scroller";
import { PlaystationRegion } from "playstation";

interface StoreProps {
    region: PlaystationRegion;
    store: PlaystationStore;
}

interface StoreState {
    hasMoreItems: boolean;
    previews: PreviewGamesMapItem[];
}

class Store extends React.Component<StoreProps, StoreState> {
    private pageSize: number = 10;
    constructor(props: StoreProps) {
        super(props);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.state = {
            hasMoreItems: true,
            previews: [],
        };
    }

    loadNextPage(nextPage: number) {
        if (!this.props.store.previews || this.state.previews.length >= this.props.store.previews.length) {
            this.setState({ hasMoreItems: false });
            return;
        }

        const batch = this.props.store.previews.slice(0, nextPage * this.pageSize + this.pageSize);
        this.setState({ previews: batch });
    }

    render() {
        if (!this.props.store || !this.props.store.previews) {
            return;
        }

        const games = this.state.previews.slice().map((item) => {
            return (
                <div key={"game-preview-" + item.key} className="Store-grid-item">
                    <GamePreview region={this.props.region} game={item.game} />
                </div>
            );
        });

        return (
            <InfiniteScroll
                className="Store-grid-list"
                pageStart={0}
                loadMore={this.loadNextPage}
                hasMore={this.state.hasMoreItems}
                initialLoad={true}
                loader={<div key={"store-page-loader" + this.state.previews.length}></div>}
            >
                {games}
            </InfiniteScroll>
        );
    }
}

const mapStateToProps = (state: ReduxStoreState) => ({ region: state.region, store: state.store } as StoreProps);

export default connect(mapStateToProps)(Store);
