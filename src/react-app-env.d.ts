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

/// <reference types="react-scripts" />

interface ReduxStoreState {
    region: RegionState;
    store: PlaystationStore;
}

interface RegionState {
    regions: PlaystationRegion[];
    current?: PlaystationRegion;
}

interface PlaystationStore {
    info?: PlaystationObject;
    previews?: PreviewGamesMapItem[];
}

interface GameDetailState {
    isLoaded: boolean;
    game?: PlaystationObject;
}

interface PreviewGamesMapItem {
    key: string;
    game: PlaystationObject;
}

interface PreviewGamesMap extends Readonly<Map<string, PlaystationItemPreview>> {}

type PlaystationItemPreview = {
    id: string;
    name: string;
    image: string;
    url: string;
    timestamp: number;
    display_price: string;
    bonus_price?: string;
    is_sale: boolean;
};
