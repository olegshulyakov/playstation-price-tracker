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

import { FETCH_GAMES_COUNT, FETCH_GAMES_LIST, CLEAR_GAMES_STORE } from "../actions/types";

const initialState: StoreState = {
    info: undefined,
    games: undefined,
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_GAMES_COUNT:
            return {
                ...state,
                info: action.info,
            } as StoreState;
        case FETCH_GAMES_LIST:
            return {
                ...state,
                games: action.games,
            } as StoreState;
        case CLEAR_GAMES_STORE:
            return {
                info: undefined,
                games: undefined,
            } as StoreState;
        default:
            return state;
    }
};