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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { getInitialPrice, getPsPlusPrice, getSalePrice } from "../../services/PlayStationGameService";
import * as PlaystationApi from "playstation-api";
import { GameDetailMediaCardContainer, GameDetailMediaCardImage, GameDetailMediaCardPrices } from "./styles";

interface Props extends React.HTMLProps<any> {
    region: PlaystationApi.types.PlaystationRegion;
    game: PlaystationApi.types.PlaystationGameResponse;
}

const MediaCard: React.FC<Props> = (props: Props) => {
    const redirectToPsStore = () => {
        window.open(PlaystationApi.helpers.getStoreGameLink(props.region, props.game.id), "_blank");
    };

    const initialPrice = getInitialPrice(props.game);
    const salePrice = getSalePrice(props.game);
    const psPlusPrice = getPsPlusPrice(props.game);

    const prices: JSX.Element[] = [];
    if (initialPrice === salePrice) {
        prices.push(
            <div key={"detail-price-" + props.game.id} className="Game-detail-price">
                {salePrice}
            </div>
        );
    } else {
        // price.push(<div className="Game-detail-inactive-price">{initialPrice}</div>);
        prices.push(
            <div key={"sale-price-" + props.game.id} className="Game-detail-sale-price">
                {salePrice}
            </div>
        );
    }

    if (psPlusPrice) {
        prices.push(
            <div key={"ps-plus-price-" + props.game.id} className="Game-detail-ps-plus-price">
                {psPlusPrice}
            </div>
        );
    }

    return (
        <GameDetailMediaCardContainer onClick={redirectToPsStore}>
            <GameDetailMediaCardImage
                loading="lazy"
                src={PlaystationApi.helpers.getPreviewImage(props.game)}
                title={props.game.name}
                placeholder={props.game.name}
                width={240}
                height={240}
            />

            <GameDetailMediaCardPrices>
                <FontAwesomeIcon key={"shopping-cart-" + props.game.id} icon={faShoppingCart} size="1x" style={{ marginRight: "0.25rem" }} />
                {prices}
            </GameDetailMediaCardPrices>
        </GameDetailMediaCardContainer>
    );
};

export default MediaCard;
