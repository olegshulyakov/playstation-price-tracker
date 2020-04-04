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
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import GamePreview from "../components/GamePreview";
import { fetchGamePreviewsList } from "../actions/gameActions";
import * as PlaystationApi from "playstation-api";

const StoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem 0.5rem 3rem;

    @media screen and (min-width: 600px) {
        padding: 3rem 1rem 0.5rem;
    }
`;

const StoreGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, var(--img-preview-side-small));
    grid-auto-rows: var(--img-preview-side-small);
    gap: 1rem;
    justify-content: center;

    @media screen and (min-width: 600px) {
        grid-template-columns: repeat(auto-fit, var(--img-preview-side));
        grid-auto-rows: var(--img-preview-side);
        gap: 0.5rem;
    }
`;

const StoreGridItem = styled.div`
    min-height: var(--img-preview-side-small);
    min-width: var(--img-preview-side-small);
    max-height: var(--img-preview-side-small);
    max-width: var(--img-preview-side-small);

    @media screen and (min-width: 600px) {
        min-height: var(--img-preview-side);
        min-width: var(--img-preview-side);
        max-height: var(--img-preview-side);
        max-width: var(--img-preview-side);
    }
`;

interface StoreProps {
    region: PlaystationApi.types.PlaystationRegion;
    store: PlaystationStore;
    fetchGames: Function;
}

class Store extends React.Component<StoreProps> {

    constructor(props: StoreProps) {
        super(props);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.hasMoreItems = this.hasMoreItems.bind(this);
    }

    hasMoreItems() {
        return !(!this.props.store.info || !this.props.store.previews || this.props.store.previews.length >= this.props.store.info.total_results);
    }

    loadNextPage(nextPage: number) {
        if (!this.props.store.info || !this.props.store.previews) {
            return;
        }
        this.props.fetchGames(this.props.region, this.props.store.info.total_results, this.props.store.previews.length);
    }

    render() {
        if (!this.props.store || !this.props.store.previews) {
            return;
        }

        const games = this.props.store.previews.slice().map((item) => {
            return (
                <StoreGridItem key={"game-preview-" + item.key}>
                    <GamePreview region={this.props.region} game={item.game}/>
                </StoreGridItem>
            );
        });

        const threshold = window.screen.height;

        return (
            <StoreContainer>
                <InfiniteScroll key={"infinite-scroll"}
                                hasMore={this.hasMoreItems()}
                                initialLoad={true}
                                isReverse={false}
                                loadMore={this.loadNextPage}
                                pageStart={0}
                                threshold={threshold}
                                useCapture={false}
                                useWindow={true}
                >
                    <StoreGrid>{games}</StoreGrid>
                </InfiniteScroll>
            </StoreContainer>
        );
    }
}

const mapStateToProps = (state: ReduxStoreState) =>
    ({ region: state.region.current, store: state.store } as StoreProps);

export default connect(mapStateToProps, { fetchGames: fetchGamePreviewsList })(Store);
