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

import { DEFAULT_FETCH_SIZE, DEFAULT_SEARCH_SIZE, SORT_DIRECTIONS, SORT_FIELDS } from "./constants";
import { PlaystationGameResponse, PlaystationRegion, PlaystationResponse } from "./types";

const baseUrl = "https://store.playstation.com/store/api/chihiro/00_09_000";

export function isQueryFailed(storeInfo: PlaystationResponse) {
    return storeInfo.cause || (storeInfo.codeName && storeInfo.codeName === "DataNotFound");
}

export async function getGeoInfo() {
    return await fetch(`${baseUrl}/geo`);
}

export async function query(
    region: PlaystationRegion,
    cusa: string,
    size: number | undefined = 1,
    start?: number
): Promise<PlaystationResponse | PlaystationGameResponse> {
    let url = `${baseUrl}/container/${region.country}/${region.language}/999/${cusa}?&sort=${SORT_FIELDS.TIMESTAMP}&direction=${SORT_DIRECTIONS.DESC}`;
    if (size !== undefined) {
        url += `&size=${size}`;
    }
    if (start !== undefined) {
        url += `&start=${start}`;
    }
    const response = await fetch(url);
    const json = await response.json();
    if (isQueryFailed(json)) {
        throw Error(`Cannot execute query. ${json.cause}`);
    }
    return json;
}

export async function getGameInfo(region: PlaystationRegion, cusa: string): Promise<PlaystationGameResponse> {
    return (await query(region, cusa, 0)) as PlaystationGameResponse;
}

export async function getStoreInfo(region: PlaystationRegion): Promise<PlaystationResponse> {
    return (await query(region, region.root, 0)) as PlaystationResponse;
}

export async function getGamesList(region: PlaystationRegion, size: number = DEFAULT_FETCH_SIZE, start = 0): Promise<PlaystationGameResponse[]> {
    const json = (await query(region, region.root, size, start)) as PlaystationResponse;
    return json.links;
}

export function getGameImageLink(region: PlaystationRegion, cusa: string, width = 240, height = 240): string {
    return `${baseUrl}/container/${region.country}/${region.language}/999/${cusa}/image?w=${width}&h=${height}`;
}

export async function search(
    region: PlaystationRegion,
    searchString: string,
    size: number = DEFAULT_SEARCH_SIZE
): Promise<PlaystationGameResponse[]> {
    const url = `https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/${region.country}/${region.language}/999/${escape(
        searchString
    )}?size=${size}`;
    const response = await fetch(url);
    const json = await response.json();
    if (isQueryFailed(json)) {
        throw Error(`Cannot execute query. ${json.cause}`);
    }
    return json.links;
}

export async function findView(region: PlaystationRegion, cusa: string): Promise<PlaystationGameResponse> {
    const url = `https://store.playstation.com/chihiro-api/viewfinder/${region.country}/${region.language}/999/${cusa}?gkb=1`;
    const response = await fetch(url);
    const json = await response.json();
    if (isQueryFailed(json)) {
        throw Error(`Cannot execute query. ${json.cause}`);
    }
    return json;
}
