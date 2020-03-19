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

import { PlaystationRegion } from "./types";

export const SORT_FIELDS = Object.freeze({ RELEASE_DATE: "release_date", TIMESTAMP: "timestamp" });
export const SORT_DIRECTIONS = Object.freeze({ ASC: "asc", DESC: "desc" });
export const DEFAULT_FETCH_SIZE = 100;

// Parsed from https://www.playstation.com/country-selector/index.html using regexp "<a href="https:\/\/www\.playstation\.com\/([a-z]{2})-([a-z]{2})\/">([^<]+)<\/a>"
export const REGIONS: PlaystationRegion[] = [
    { name: "Argentina", language: "es", country: "ar", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Australia", language: "en", country: "au", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Austria (Österreich)", language: "de", country: "at", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Belgium (Français)", language: "fr", country: "be", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Belgium (Nederlands)", language: "nl", country: "be", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Brasil", language: "pt", country: "br", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Bulgaria (България)", language: "bg", country: "bg", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Canada", language: "en", country: "ca", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Canada (French)", language: "fr", country: "ca", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Chile", language: "es", country: "cl", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Colombia", language: "es", country: "co", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Costa Rica", language: "es", country: "cr", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Croatia (Hrvatska)", language: "hr", country: "hr", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Cyprus", language: "en", country: "cy", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Czech Republic (Ceská Republika)", language: "cs", country: "cz", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Denmark (Danmark)", language: "da", country: "dk", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Ecuador", language: "es", country: "ec", root: "STORE-MSF77008-ALLGAMES" },
    { name: "El Salvador", language: "es", country: "sv", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Finland (Suomi)", language: "fi", country: "fi", root: "STORE-MSF75508-FULLGAMES" },
    { name: "France", language: "fr", country: "fr", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Germany (Deutschland)", language: "de", country: "de", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Greece (Ελλαδα)", language: "el", country: "gr", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Guatemala", language: "es", country: "gt", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Honduras", language: "es", country: "hn", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Hungary (Magyarország)", language: "hu", country: "hu", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Iceland (Ísland)", language: "is", country: "is", root: "STORE-MSF75508-FULLGAMES" },
    { name: "India", language: "en", country: "in", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Ireland", language: "en", country: "ie", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Italy", language: "it", country: "it", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Luxembourg (Deutsch)", language: "de", country: "lu", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Luxembourg (Français)", language: "fr", country: "lu", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Malta", language: "en", country: "mt", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Mexico (México)", language: "es", country: "mx", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Nederland", language: "nl", country: "nl", root: "STORE-MSF75508-FULLGAMES" },
    { name: "New Zealand", language: "en", country: "nz", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Nicaragua", language: "es", country: "ni", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Norway (Norge)", language: "no", country: "no", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Panama (Panamá)", language: "es", country: "pa", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Paraguay", language: "es", country: "py", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Peru (Perú)", language: "es", country: "pe", root: "STORE-MSF77008-ALLGAMES" },
    { name: "Poland (Polska)", language: "pl", country: "pl", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Portugal", language: "pt", country: "pt", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Romania (România)", language: "ro", country: "ro", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Russia (Россия)", language: "ru", country: "ru", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Saudi Arabia (Arabic)", language: "ar", country: "sa", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Slovenia (Slovenija)", language: "sl", country: "si", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Slovakia (Slovenská Republika)", language: "sk", country: "sk", root: "STORE-MSF75508-FULLGAMES" },
    { name: "South Africa", language: "en", country: "za", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Spain (España)", language: "es", country: "es", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Sweden (Sverige)", language: "sv", country: "se", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Switzerland (Deutsch)", language: "de", country: "ch", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Switzerland (Français)", language: "fr", country: "ch", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Switzerland (Italiano)", language: "it", country: "ch", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Turkey (Türkiye)", language: "tr", country: "tr", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Ukraine (Україна)", language: "uk", country: "ua", root: "STORE-MSF75508-FULLGAMES" },
    { name: "United Arab Emirates / Middle East", language: "en", country: "ae", root: "STORE-MSF75508-FULLGAMES" },
    { name: "United States", language: "en", country: "us", root: "STORE-MSF77008-ALLGAMES" },
    { name: "United Kingdom", language: "en", country: "gb", root: "STORE-MSF75508-FULLGAMES" },
    { name: "Uruguay", language: "es", country: "uy", root: "STORE-MSF77008-ALLGAMES" },
];