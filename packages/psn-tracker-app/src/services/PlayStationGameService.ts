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

import * as PlaystationApi from "playstation-api";

export const getGamePreview = (game: PlaystationApi.types.PlaystationGameResponse): PlaystationItemPreview => {
    const image = game.images && game.images[0] ? game.images[0].url : "";
    const currentPrice = getCurrentPrice(game);
    const psPlusPrice = getPsPlusPrice(game);
    return {
        id: game.id,
        name: game.name,
        image: image,
        url: game.url,
        timestamp: game.timestamp,
        display_price: currentPrice,
        bonus_price: currentPrice === psPlusPrice ? undefined : psPlusPrice,
        is_sale: PlaystationApi.helpers.isSale(game),
    } as PlaystationItemPreview;
};

export const getInitialPrice = (
    game: PlaystationApi.types.PlaystationGameResponse | PlaystationApi.types.PlaystationResponse,
): string | undefined => {
    if (game.default_sku) {
        return game.default_sku.display_price;
    }
    return undefined;
};

export const getCurrentPrice = (
    game: PlaystationApi.types.PlaystationGameResponse | PlaystationApi.types.PlaystationResponse,
): string | undefined => {
    const saleDetails = PlaystationApi.helpers.getSaleDetails(game);
    if (saleDetails && saleDetails.display_price) {
        return saleDetails.display_price;
    }
    return getInitialPrice(game);
};

export const getPsPlusPrice = (
    game: PlaystationApi.types.PlaystationGameResponse | PlaystationApi.types.PlaystationResponse,
): string | undefined => {
    const saleDetails = PlaystationApi.helpers.getSaleDetails(game);
    if (saleDetails && saleDetails.bonus_display_price) {
        return saleDetails.bonus_display_price;
    }
    return undefined;
};
