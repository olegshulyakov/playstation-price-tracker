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

import { FETCH_GAMES_COUNT, CLEAR_GAMES_STORE, FETCH_PREVIEW_MAP } from "../actions/types";
import { STORE, GAMES, PREVIEWS } from "../store/keys";
import { arrayToMap, mapToArray } from "../services/converter";

const initialState: StoreState = {
    info: undefined,
    previews: undefined,
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_GAMES_COUNT:
            localStorage.setItem(STORE, JSON.stringify(action.info));

            return {
                ...state,
                info: action.info,
            } as StoreState;

        case FETCH_PREVIEW_MAP:
            const previewsMap = arrayToMap(state.previews);

            for (let i = 0; i < action.games.length; i++) {
                const game = action.games[i];
                previewsMap.set(game.id, game);
            }

            const previews = mapToArray(previewsMap);

            localStorage.removeItem(PREVIEWS);
            localStorage.setItem(PREVIEWS, JSON.stringify(previews));

            return {
                ...state,
                previews: previews,
            } as StoreState;

        case CLEAR_GAMES_STORE:
            localStorage.removeItem(STORE);
            localStorage.removeItem(GAMES);

            return {
                info: undefined,
                games: undefined,
                map: undefined,
            } as StoreState;

        default:
            return state;
    }
};
