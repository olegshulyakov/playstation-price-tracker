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

interface CountryCodeCallBack {
    (country_code: string): void;
}

export const getAddress = async (pos: Position): Promise<string> => {
    const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
    const json = await resp.json();
    if (!json.address || !json.address.country_code) return "";

    return json.address.country_code;
};

export const getCountryCode = (callback: CountryCodeCallBack) => {
    if (!navigator || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
        getAddress(pos)
            .then((country_code) => callback(country_code))
            .catch((e) => console.error(e));
    });
};
