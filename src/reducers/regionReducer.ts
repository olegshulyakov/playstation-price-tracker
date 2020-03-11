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

import { SELECT_REGION, CLEAR_REGION, FETCH_REGIONS } from "../actions/types";
import { PlaystationRegion } from "playstation";
import { REGIONS, REGION } from "../store/keys";

const initialState: RegionState = {
    regions: [],
    current: undefined,
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_REGIONS:
            localStorage.setItem(REGIONS, JSON.stringify(action.regions));
            return { ...state, regions: action.regions };
        case SELECT_REGION:
            localStorage.setItem(REGION, JSON.stringify(action.region));
            return { ...state, current: action.region as PlaystationRegion };
        case CLEAR_REGION:
            localStorage.removeItem(REGION);
            return { ...state, current: null };
        default:
            return state;
    }
};
