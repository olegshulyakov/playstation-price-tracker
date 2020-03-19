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

import { PlaystationLink, PlaystationObject, Reward } from "./Playstation/types";

export const getStoreGameLink = (cusa: string, language: string, country: string): string => {
    console.debug(`Generating ps store link for [${cusa}]`);
    return `https://store.playstation.com/${language}-${country}/product/${cusa}`;
};

export const getGamePreview = (game: PlaystationLink): PlaystationItemPreview => {
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
        is_sale: isSale(game),
    } as PlaystationItemPreview;
};

export const getInitialPrice = (game: PlaystationLink | PlaystationObject): string | undefined => {
    if (game.default_sku) {
        return game.default_sku.display_price;
    }
    return undefined;
};

export const isSale = (game: PlaystationLink | PlaystationObject): boolean | undefined => {
    return game.default_sku?.rewards && game.default_sku?.rewards.length > 0;
};

export const getSaleDetails = (game: PlaystationLink | PlaystationObject): Reward | undefined => {
    if (game.default_sku?.rewards && game.default_sku?.rewards.length > 0) {
        return game.default_sku?.rewards[0];
    }
    return undefined;
};

export const getCurrentPrice = (game: PlaystationLink | PlaystationObject): string | undefined => {
    const saleDetails = getSaleDetails(game);
    if (saleDetails && saleDetails.display_price) {
        return saleDetails.display_price;
    }
    return getInitialPrice(game);
};

export const getPsPlusPrice = (game: PlaystationLink | PlaystationObject): string | undefined => {
    const saleDetails = getSaleDetails(game);
    if (saleDetails && saleDetails.bonus_display_price) {
        return saleDetails.bonus_display_price;
    }
    return undefined;
};

export const getPreviewImage = (game: PlaystationLink | PlaystationObject): string => {
    return game.images[0].url;
};
