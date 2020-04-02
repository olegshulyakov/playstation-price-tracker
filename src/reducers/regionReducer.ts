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

import { CLEAR_REGION, FETCH_REGIONS, SELECT_REGION } from "../actions/types";
import { REGIONS } from "../store/keys";
import * as PlaystationApi from "playstation-api";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState: RegionState = {
    regions: PlaystationApi.constants.REGIONS,
    current: undefined,
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_REGIONS:
            return { ...state, regions: action.regions };
        case SELECT_REGION:
            return { ...state, current: action.region as PlaystationApi.types.PlaystationRegion };
        case CLEAR_REGION:
            return { ...state, current: null };
        default:
            return state;
    }
};

const regionPersistConfig = {
    key: REGIONS,
    storage: storage,
};

export default persistReducer(regionPersistConfig, reducer);