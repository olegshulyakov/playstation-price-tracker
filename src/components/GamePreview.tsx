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
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import * as PlaystationApi from "playstation-api";

const GamePreviewContainer = styled.div`
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    position: relative;
    vertical-align: middle;
    border-radius: 0.25rem;

    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const GamePreviewImage = styled.img`
    min-height: var(--img-preview-side-small);
    min-width: var(--img-preview-side-small);
    max-height: var(--img-preview-side-small);
    max-width: var(--img-preview-side-small);

    @media (min-width: 600px) {
        border-radius: 0.25rem;
        min-height: var(--img-preview-side);
        min-width: var(--img-preview-side);
        max-height: var(--img-preview-side);
        max-width: var(--img-preview-side);
    }
`;

const GamePreviewBadge = styled.span`
    right: 0;
    bottom: 0;
    display: flex;
    position: absolute;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0.1rem;
    margin-right: 0.1rem;

    @media (min-width: 600px) {
        margin-bottom: 0.25rem;
        margin-right: 0.25rem;
    }
`;

const GamePreviewDefaultPrice = styled.span`
    background-color: var(--bg-secondary);
    color: var(--price-default);

    width: 100%;
    text-align: center;
    padding: 0.1rem 0.1rem 0.1rem 0.1rem;
    border-radius: 0.5rem;
    letter-spacing: -1px;
    white-space: nowrap;
    font-weight: 600;
    font-size: 1.25rem;

    @media (min-width: 600px) {
        padding: 0.1rem 0.25rem 0.1rem 0.25rem;
    }
`;

const GamePreviewSalePrice = styled.span`
    background-color: var(--bg-secondary);
    color: var(--price-sale);

    width: 100%;
    text-align: center;
    padding: 0.1rem 0.1rem 0.1rem 0.1rem;
    border-radius: 0.5rem;
    letter-spacing: -1px;
    white-space: nowrap;
    font-weight: 600;
    font-size: 1.25rem;

    @media (min-width: 600px) {
        padding: 0.1rem 0.25rem 0.1rem 0.25rem;
    }
`;

const GamePreviewPsPlusPrice = styled.span`
    background-color: var(--bg-secondary);
    color: var(--price-ps-plus);
    margin-top: 0.05rem;

    width: 100%;
    text-align: center;
    padding: 0.1rem 0.1rem 0.1rem 0.1rem;
    border-radius: 0.5rem;
    letter-spacing: -1px;
    white-space: nowrap;
    font-weight: 600;
    font-size: 1.25rem;

    @media (min-width: 600px) {
        margin-top: 0.1rem;
        padding: 0.1rem 0.25rem 0.1rem 0.25rem;
    }
`;

export interface GamePreviewProps extends RouteComponentProps {
    region: PlaystationApi.types.PlaystationRegion;
    game: PlaystationItemPreview;
}

class GamePreview extends React.Component<GamePreviewProps> {
    constructor(props: GamePreviewProps) {
        super(props);
        this.handleGameClick = this.handleGameClick.bind(this);
        this.redirectToPsStore = this.redirectToPsStore.bind(this);
    }

    handleGameClick(game: PlaystationItemPreview) {
        this.props.history.push({ pathname: "/game/" + game.id, state: game.url });
    }

    redirectToPsStore(event: any) {
        event.preventDefault();
        window.open(
            PlaystationApi.helpers.getStoreGameLink(this.props.region, this.props.game.id),
            "_blank",
        );
    }

    render() {
        const prices = [];
        prices.push(
            this.props.game.is_sale ? (
                <GamePreviewSalePrice key={"game-preview-price-" + this.props.game.id}>
                    {this.props.game.display_price}
                </GamePreviewSalePrice>
            ) : (
                <GamePreviewDefaultPrice key={"game-preview-price-" + this.props.game.id}>
                    {this.props.game.display_price}
                </GamePreviewDefaultPrice>
            ),
        );
        if (this.props.game.bonus_price) {
            prices.push(
                <GamePreviewPsPlusPrice key={"game-preview-ps-plus-price-" + this.props.game.id}>
                    {this.props.game.bonus_price}
                </GamePreviewPsPlusPrice>,
            );
        }

        return (
            <GamePreviewContainer>
                <GamePreviewImage
                    src={this.props.game.image}
                    loading="lazy"
                    alt={this.props.game.name}
                    title={this.props.game.name}
                    placeholder={this.props.game.name}
                    width={240}
                    height={240}
                    onClick={() => this.handleGameClick(this.props.game)}
                />

                <GamePreviewBadge onClick={this.redirectToPsStore}>{prices}</GamePreviewBadge>
            </GamePreviewContainer>
        );
    }
}

export default withRouter(GamePreview);
