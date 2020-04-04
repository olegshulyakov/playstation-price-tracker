/**
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
import fetch from "node-fetch";
import {logger} from "../../components/Logger";

export const queryPsStore = async (region: any, cusa: string, size: number = 0, start: number = 0) => {
    logger.debug(`[${region.name}] Quering cusa=${cusa}, start=${start}, size=${size}`);

    const baseUrl = "https://store.playstation.com/store/api/chihiro/00_09_000";
    let url = `${baseUrl}/container/${region.country}/${region.language}/999/${cusa}?&sort=timestamp&direction=asc`;
    if (size !== undefined) {
        url += `&size=${size}`;
    }
    if (start !== undefined) {
        url += `&start=${start}`;
    }

    const response = await fetch(url);
    const json: any = response.json();
    if (json.cause) {
        logger.error(`[${region.name}] Cannot execute query. ${json.cause}`);
        return undefined;
    }
    return json;
};
