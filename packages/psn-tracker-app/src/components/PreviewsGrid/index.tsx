/*
 * Copyright (c) 2020. Oleg Shulyakov
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
import { Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import * as PlaystationApi from "playstation-api";
import GamePreview from "./GamePreview";

const StoreGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, var(--img-preview-side-small));
    grid-auto-rows: auto;
    gap: 1rem;
    justify-content: center;

    @media screen and (min-width: 600px) {
        grid-template-columns: repeat(auto-fit, var(--img-preview-side));
        grid-auto-rows: auto;
        gap: 0.5rem;
    }
`;

interface PreviewsGridProps {
    region: PlaystationApi.types.PlaystationRegion;
    games: PreviewGamesMapItem[];
    hasMoreItems: Function;
    loadNextPage: Function;
}

class PreviewsGrid extends React.Component<PreviewsGridProps> {
    constructor(props: PreviewsGridProps) {
        super(props);
        this.loadNextPage = this.loadNextPage.bind(this);
    }

    loadNextPage(nextPage: number) {
        this.props.loadNextPage(nextPage);
    }

    render() {
        const items = this.props.games.slice().map((item) => {
            return <GamePreview key={"game-preview-" + item.key} region={this.props.region} game={item.game} />;
        });

        const threshold = window.screen.height;

        return (
            <Container fluid>
                <InfiniteScroll
                    key={"infinite-scroll"}
                    hasMore={this.props.hasMoreItems()}
                    initialLoad={true}
                    isReverse={false}
                    loadMore={this.loadNextPage}
                    pageStart={0}
                    threshold={threshold}
                    useCapture={false}
                    useWindow={true}
                >
                    <StoreGrid>{items}</StoreGrid>
                </InfiniteScroll>
            </Container>
        );
    }
}

export default PreviewsGrid;
