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

import PlayStationService from "../services/PlayStationService";
import { FETCH_GAMES_COUNT, FETCH_GAMES_LIST } from "./types";

export const fetchGamesStore = (language: string, country: string) => (dispatch: Function) => {
    const service = new PlayStationService(language, country);
    service
        .getStoreInfo()
        .then((storeInfo) => {
            dispatch({ type: FETCH_GAMES_COUNT, count: storeInfo.total_results });
        })
        .then(() => {
            service.getGamesList().then((links) => {
                dispatch({ type: FETCH_GAMES_LIST, games: links });
            });
        });
};
