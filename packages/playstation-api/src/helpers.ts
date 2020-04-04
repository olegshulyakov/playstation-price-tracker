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

import { PlaystationGameResponse, PlaystationRegion, PlaystationResponse, Reward } from "./types";

export function getStoreGameLink(region: PlaystationRegion, cusa: string): string {
    return `https://store.playstation.com/${region.language}-${region.country}/product/${cusa}`;
}

export function getPreviewImage(game: PlaystationGameResponse | PlaystationResponse): string {
    return game.images[0].url;
}

export function isSale(game: PlaystationGameResponse | PlaystationResponse): boolean | undefined {
    return game.default_sku?.rewards && game.default_sku?.rewards.length > 0;
}

export function getSaleDetails(game: PlaystationGameResponse | PlaystationResponse): Reward | undefined {
    if (game.default_sku?.rewards && game.default_sku?.rewards.length > 0) {
        return game.default_sku?.rewards[0];
    }
    return undefined;
}