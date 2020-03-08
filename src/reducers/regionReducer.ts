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

import { SELECT_REGION, CLEAR_REGION } from "../actions/types";
import { PlaystationRegion } from "playstation";
import { REGION } from "../store/keys";

const initialState = {
    region: undefined,
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SELECT_REGION:
            localStorage.setItem(REGION, JSON.stringify(action.region));
            return action.region as PlaystationRegion;
        case CLEAR_REGION:
            localStorage.removeItem(REGION);
            return null;
        default:
            return state;
    }
};
