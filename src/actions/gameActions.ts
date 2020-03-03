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

import { FETCH_GAMES_COUNT, FETCH_GAMES_LIST, CLEAR_GAMES_STORE } from "./types";
import PlayStationService from "../services/PlayStationService";

export const fetchStoreInfo = (language: string, country: string) => (dispatch: Function) => {
    console.debug(`Fetching store info for ${language}-${country}`);
    const service = new PlayStationService(language, country);
    service.getStoreInfo().then((storeInfo) => {
        dispatch({ type: FETCH_GAMES_COUNT, info: storeInfo });
    });
};

export const fetchGamesList = (language: string, country: string) => (dispatch: Function) => {
    console.debug(`Fetching games for ${language}-${country}`);
    const service = new PlayStationService(language, country);
    service.getGamesList().then((links) => {
        dispatch({ type: FETCH_GAMES_LIST, games: links });
    });
};

export const clearGamesStore = () => (dispatch: Function) => {
    console.debug("Clearing games store");
    dispatch({ type: CLEAR_GAMES_STORE });
};
