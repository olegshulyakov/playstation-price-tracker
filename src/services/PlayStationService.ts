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

import { PlaystationLink, PlaystationObject, PlaystationRegion } from "playstation";

const SORT_FIELD = Object.freeze({ RELEASE_DATE: "release_date", TIMESTAMP: "timestamp" });
const SORT_DIRECTION = Object.freeze({ ASC: "asc", DESC: "desc" });

// Parsed from https://www.playstation.com/country-selector/index.html using regexp "<a href="https:\/\/www\.playstation\.com\/([a-z]{2})-([a-z]{2})\/">([^<]+)<\/a>"
export const playstationRegionList: PlaystationRegion[] = [
    { name: "Argentina", language: "es", country: "ar" },
    { name: "Australia", language: "en", country: "au" },
    { name: "Austria (Österreich)", language: "de", country: "at" },
    { name: "Bahrain (English)", language: "en", country: "ae" },
    { name: "Belgium (Français)", language: "fr", country: "be" },
    { name: "Belgium (Nederlands)", language: "nl", country: "be" },
    { name: "Brasil", language: "pt", country: "br" },
    { name: "Bulgaria (България)", language: "bg", country: "bg" },
    { name: "Canada", language: "en", country: "ca" },
    { name: "Canada (French)", language: "fr", country: "ca" },
    { name: "Chile", language: "es", country: "cl" },
    { name: "Colombia", language: "es", country: "co" },
    { name: "Costa Rica", language: "es", country: "cr" },
    { name: "Croatia (Hrvatska)", language: "hr", country: "hr" },
    { name: "Cyprus", language: "en", country: "cy" },
    { name: "Czech Republic (Ceská Republika)", language: "cs", country: "cz" },
    { name: "Denmark (Danmark)", language: "da", country: "dk" },
    { name: "Ecuador", language: "es", country: "ec" },
    { name: "El Salvador", language: "es", country: "sv" },
    { name: "Finland (Suomi)", language: "fi", country: "fi" },
    { name: "France", language: "fr", country: "fr" },
    { name: "Germany (Deutschland)", language: "de", country: "de" },
    { name: "Greece (Ελλαδα)", language: "el", country: "gr" },
    { name: "Guatemala", language: "es", country: "gt" },
    { name: "Honduras", language: "es", country: "hn" },
    { name: "Hungary (Magyarország)", language: "hu", country: "hu" },
    { name: "Iceland (Ísland)", language: "is", country: "is" },
    { name: "India", language: "en", country: "in" },
    { name: "Ireland", language: "en", country: "ie" },
    { name: "Italy", language: "it", country: "it" },
    { name: "Kuwait (English)", language: "en", country: "ae" },
    { name: "Lebanon (English)", language: "en", country: "ae" },
    { name: "Luxembourg (Deutsch)", language: "de", country: "lu" },
    { name: "Luxembourg (Français)", language: "fr", country: "lu" },
    { name: "Malta", language: "en", country: "mt" },
    { name: "Mexico (México)", language: "es", country: "mx" },
    { name: "Nederland", language: "nl", country: "nl" },
    { name: "New Zealand", language: "en", country: "nz" },
    { name: "Nicaragua", language: "es", country: "ni" },
    { name: "Norway (Norge)", language: "no", country: "no" },
    { name: "Oman (English)", language: "en", country: "ae" },
    { name: "Panama (Panamá)", language: "es", country: "pa" },
    { name: "Paraguay", language: "es", country: "py" },
    { name: "Peru (Perú)", language: "es", country: "pe" },
    { name: "Poland (Polska)", language: "pl", country: "pl" },
    { name: "Portugal", language: "pt", country: "pt" },
    { name: "Qatar (English)", language: "en", country: "ae" },
    { name: "Romania (România)", language: "ro", country: "ro" },
    { name: "Russia (Россия)", language: "ru", country: "ru" },
    { name: "Saudi Arabia (Arabic)", language: "ar", country: "sa" },
    { name: "Slovenia (Slovenija)", language: "sl", country: "si" },
    { name: "Slovakia (Slovenská Republika)", language: "sk", country: "sk" },
    { name: "South Africa", language: "en", country: "za" },
    { name: "Spain (España)", language: "es", country: "es" },
    { name: "Sweden (Sverige)", language: "sv", country: "se" },
    { name: "Switzerland (Deutsch)", language: "de", country: "ch" },
    { name: "Switzerland (Français)", language: "fr", country: "ch" },
    { name: "Switzerland (Italiano)", language: "it", country: "ch" },
    { name: "Turkey (Türkiye)", language: "tr", country: "tr" },
    { name: "Ukraine (Україна)", language: "uk", country: "ua" },
    { name: "United Arab Emirates / Middle East", language: "en", country: "ae" },
    { name: "United States", language: "en", country: "us" },
    { name: "United Kingdom", language: "en", country: "gb" },
    { name: "Uruguay", language: "es", country: "uy" },
];

export default class PlayStationService {
    private readonly baseUrl = "https://store.playstation.com/store/api/chihiro/00_09_000";
    private readonly rootCusa = "STORE-MSF75508-FULLGAMES";
    private language: string;
    private country: string;
    private storeInfo: any;

    constructor(language: string, country: string) {
        console.debug(`Creating PlayStationService for [${language}, ${country}]`);
        this.language = language;
        this.country = country;
    }

    async getGeoInfo() {
        console.debug(`Quering geo info`);
        const response = await fetch(`${this.baseUrl}/geo`);
        return response;
    }

    async query(cusa: string, size: number = 1, start: number = 0) {
        console.debug(`Quering cusa=${cusa}, start=${start}, size=${size}`);
        const response = await fetch(
            `${this.baseUrl}/container/${this.language}/${this.country}/999/${cusa}?size=${size}&start=${start}&sort_default=${SORT_FIELD.TIMESTAMP}&sort_default_direction=${SORT_DIRECTION.DESC}`,
        );
        return response;
    }

    async getGameInfo(cusa: string): Promise<PlaystationObject> {
        console.debug(`Loading game info ${cusa}`);
        const response = await this.query(cusa);
        const json = await response.json();
        return json;
    }

    async getStoreInfo(): Promise<PlaystationObject> {
        console.debug("Loading games count");
        const response = await this.query(this.rootCusa, 0);
        const json = await response.json();
        //console.debug(`Count response: ${JSON.stringify(json)}`);
        this.storeInfo = json;
        return this.storeInfo;
    }

    async getGamesList(): Promise<PlaystationLink[]> {
        console.debug("Loading games");
        const response = await this.query(this.rootCusa, 50);
        const json = await response.json();
        //console.debug(`Game list response: ${JSON.stringify(json)}`);
        return json.links;
    }

    getGameImageLink(cusa: string, width: number = 240, height: number = 240): string {
        return `${this.baseUrl}/titlecontainer/${this.country}/${this.language}/999/${cusa}/image?w=${width}&h=${height}`;
    }

    search(query: string) {
        return "https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/SA/en/999/horizon?suggested_size=10&mode=game";
    }

    findView(cusa: string) {
        return "https://store.playstation.com/chihiro-api/viewfinder/ru/ru/999/STORE-MSF75508-FULLGAMES?size=10&gkb=1&geoCountry=ru&start=0";
    }
}
