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
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { PlaystationObject, PlaystationRegion } from "playstation";
import {
    getStoreGameLink,
    getInitialPrice,
    getCurrentPrice,
    getPsPlusPrice,
    getPreviewImage,
} from "../services/PlayStationGameService";

const GameDetailMediaCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

const GameDetailMediaCardImage = styled.img`
    width: 240px;
    height: 240px;
    align-self: center;
    border-radius: 0.25rem;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const GameDetailMediaCardPrices = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0.5rem 0rem;
    align-items: center;
    font-size: 2rem;

    @media (min-width: 600px) {
        font-size: 1rem;
    }
`;

interface GameDetailMediaCardProps {
    region: PlaystationRegion;
    game: PlaystationObject;
}

export default class GameDetailMediaCard extends React.Component<GameDetailMediaCardProps> {
    redirectToPsStore() {
        window.open(
            getStoreGameLink(this.props.game.id, this.props.region.language, this.props.region.country),
            "_blank",
        );
    }

    render() {
        const initialPrice = getInitialPrice(this.props.game);
        const currentPrice = getCurrentPrice(this.props.game);
        const psPlusPrice = getPsPlusPrice(this.props.game);

        const prices: JSX.Element[] = [];
        if (initialPrice === currentPrice) {
            prices.push(
                <div key={"detail-price-" + this.props.game.id} className="Game-detail-price">
                    {currentPrice}
                </div>,
            );
        } else {
            // price.push(<div className="Game-detail-inactive-price">{initialPrice}</div>);
            prices.push(
                <div key={"sale-price-" + this.props.game.id} className="Game-detail-sale-price">
                    {currentPrice}
                </div>,
            );
        }

        if (psPlusPrice) {
            prices.push(
                <div key={"ps-plus-price-" + this.props.game.id} className="Game-detail-ps-plus-price">
                    {psPlusPrice}
                </div>,
            );
        }

        return (
            <GameDetailMediaCardContainer onClick={this.redirectToPsStore.bind(this)}>
                <GameDetailMediaCardImage
                    loading="lazy"
                    src={getPreviewImage(this.props.game)}
                    title={this.props.game.name}
                    placeholder={this.props.game.name}
                />

                <GameDetailMediaCardPrices>
                    <FontAwesomeIcon
                        key={"shopping-cart-" + this.props.game.id}
                        icon={faShoppingCart}
                        size="1x"
                        style={{ marginRight: "0.25rem" }}
                    />
                    {prices}
                </GameDetailMediaCardPrices>
            </GameDetailMediaCardContainer>
        );
    }
}
