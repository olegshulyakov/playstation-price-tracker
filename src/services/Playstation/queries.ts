/*
 * Copyright (c) 2020. Oleg Shulyakov
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

import { SORT_DIRECTIONS, SORT_FIELDS } from "./constants";
import { PlaystationLink, PlaystationObject, PlaystationRegion } from "./types";

const baseUrl = "https://store.playstation.com/store/api/chihiro/00_09_000";

export const isQueryFailed = (storeInfo: PlaystationObject) => {
    return storeInfo.cause || (storeInfo.codeName && storeInfo.codeName === "DataNotFound");
};

export async function getGeoInfo() {
    console.debug(`Quering geo info`);
    return await fetch(`${baseUrl}/geo`);
}

export async function query(region: PlaystationRegion, cusa: string, size: number | undefined = 1, start: number | undefined = undefined) {
    console.debug(`Quering cusa=${cusa}, start=${start}, size=${size}`);
    let url = `${baseUrl}/container/${region.country}/${region.language}/999/${cusa}?&sort=${SORT_FIELDS.TIMESTAMP}&direction=${SORT_DIRECTIONS.DESC}`;
    if (size !== undefined) {
        url += `&size=${size}`;
    }
    if (start !== undefined) {
        url += `&start=${start}`;
    }
    const response = await fetch(url);
    const json: any = await response.json();
    if (isQueryFailed(json)) {
        console.error(`Cannot execute query. ${json.cause}`);
    }
    return json;
}

export async function getGameInfo(region: PlaystationRegion, cusa: string): Promise<PlaystationObject> {
    console.debug(`Loading game info ${cusa}`);
    return await query(region, cusa, 0);
}

export async function getStoreInfo(region: PlaystationRegion): Promise<PlaystationObject> {
    console.debug("Loading games count");
    return await query(region, region.root, 0);
}

export async function getGamesList(region: PlaystationRegion, size: number = 50, start: number = 0): Promise<PlaystationLink[]> {
    console.debug("Loading games");
    const json = await query(region, region.root, size, start);
    return json.links;
}

export function getGameImageLink(region: PlaystationRegion, cusa: string, width: number = 240, height: number = 240): string {
    return `${baseUrl}/titlecontainer/${region.country}/${region.language}/999/${cusa}/image?w=${width}&h=${height}`;
}

export function search(region: PlaystationRegion, query: string) {
    return `https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/${region.country}/${region.language}/999/${query}?suggested_size=10&mode=game`;
}

export function findView(region: PlaystationRegion, cusa: string) {
    return `https://store.playstation.com/chihiro-api/viewfinder/${region.country}/${region.language}/999/${cusa}?size=0&gkb=1&start=0`;
}