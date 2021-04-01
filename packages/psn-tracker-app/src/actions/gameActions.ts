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

import { CLEAR_GAMES_STORE, CLEAR_REGION, FETCH_GAMES_COUNT, FETCH_PREVIEW_MAP } from "./types";
import { getGamePreview } from "../services/PlayStationGameService";
import * as PlaystationApi from "playstation-api";

const fetchSize = 100; //PlaystationApi.constants.DEFAULT_FETCH_SIZE;

export const fetchStoreInfo = (region: PlaystationApi.types.PlaystationRegion) => async (dispatch: Function) => {
    if (!region || !region.name) {
        console.warn("No region specified.");
        return;
    }

    console.debug(`Fetching store info for [${region.name}]`);
    try {
        const storeInfo = await PlaystationApi.queries.getStoreInfo(region);
        if (PlaystationApi.queries.isQueryFailed(storeInfo)) {
            dispatch({ type: CLEAR_REGION });
            return;
        }
        dispatch({ type: FETCH_GAMES_COUNT, info: storeInfo });
    } catch (e) {
        console.error(`Cannot fetch store information [${region.name}].`, e);
    }
};

export const fetchGamePreviewsList = (
    region: PlaystationApi.types.PlaystationRegion,
    total: number,
    start: number = 0,
    size: number = fetchSize
) => async (dispatch: Function) => {
    if (!region || !region.name) {
        console.warn("No region specified.");
        return;
    }

    if (start > total) {
        console.debug(`Fetched all game previews for ${region.name}`);
        return;
    }

    console.debug(`Fetching game previews for ${region.name}. total=${total} start=${start}, size=${size}`);

    try {
        const links: PlaystationApi.types.PlaystationGameResponse[] = await PlaystationApi.queries.getGamesList(region, size, start);
        if (!links) return;

        const previews = links.map((link) => getGamePreview(region, link)).filter((r) => r.playable_platform && r.playable_platform.length > 0);
        dispatch({ type: FETCH_PREVIEW_MAP, games: previews });
    } catch (e) {
        console.error("Cannot fetch games.", e);
    }
};

export const clearGamesStore = () => async (dispatch: Function) => {
    console.debug("Clearing games store");
    dispatch({ type: CLEAR_GAMES_STORE });
};

export const searchGames = (region: PlaystationApi.types.PlaystationRegion, searchString: string, size: number = fetchSize) => async (
    dispatch: Function
) => {
    if (!region || !region.name) {
        console.warn("No region specified.");
        return;
    }
    console.debug(`Searching games for ${region.name}. string=[${searchString}]`);
    try {
        const links: PlaystationApi.types.PlaystationGameResponse[] = await PlaystationApi.queries.search(region, searchString, size);
        if (!links) return;

        const previews = links.map((link) => getGamePreview(region, link)).filter((r) => r.playable_platform && r.playable_platform.length > 0);
        dispatch({ type: FETCH_PREVIEW_MAP, games: previews });
    } catch (e) {
        console.error("Cannot fetch games.", e);
    }
};
