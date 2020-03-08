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

import { SELECT_REGION, CLEAR_REGION } from "./types";
import { PlaystationRegion } from "playstation";

export const selectRegion = (region: PlaystationRegion) => (dispatch: Function) => {
    console.debug(`Changing region to ${region.name}`);
    dispatch({ type: SELECT_REGION, region: region });
};

export const clearRegion = () => (dispatch: Function) => {
    console.debug("Clearing region");
    dispatch({ type: CLEAR_REGION });
};
