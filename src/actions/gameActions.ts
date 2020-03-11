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

import { FETCH_GAMES_COUNT, CLEAR_GAMES_STORE, FETCH_PREVIEW_MAP, CLEAR_REGION } from "./types";
import PlayStationService, { isQueryFailed, DEFAULT_FETCH_SIZE } from "../services/PlayStationService";
import { getGamePreview } from "../services/PlayStationGameService";
import { PlaystationRegion } from "playstation";

export const fetchStoreInfo = (region: PlaystationRegion) => async (dispatch: Function) => {
    if (!region || !region.name) {
        console.warn("No region specified.");
        return;
    }

    console.debug(`Fetching store info for [${region.name}]`);
    const service = new PlayStationService(region);
    try {
        const storeInfo = await service.getStoreInfo();
        if (isQueryFailed(storeInfo)) {
            dispatch({ type: CLEAR_REGION });
            return;
        }
        dispatch({ type: FETCH_GAMES_COUNT, info: storeInfo });
    } catch (e) {
        console.error(`Cannot fetch store information [${region.name}].`, e);
    }
};

export const fetchGamePreviewsList = (
    region: PlaystationRegion,
    total: number,
    start: number = 0,
    size: number = DEFAULT_FETCH_SIZE,
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

    const service = new PlayStationService(region);
    try {
        const links = await service.getGamesList(size, start);
        if (!links) {
            return;
        }
        const previews = links.map((link) => {
            return getGamePreview(link);
        });
        dispatch({ type: FETCH_PREVIEW_MAP, games: previews });
    } catch (e) {
        console.error("Cannot fetch games.", e);
    }
};

export const clearGamesStore = () => async (dispatch: Function) => {
    console.debug("Clearing games store");
    dispatch({ type: CLEAR_GAMES_STORE });
};
