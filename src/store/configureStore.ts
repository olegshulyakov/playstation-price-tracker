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

import { createStore, applyMiddleware, StoreEnhancer, compose, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";
import { REGIONS, REGION, STORE, PREVIEWS } from "./keys";

let persistedRegions = undefined;
try {
    const str = localStorage.getItem(REGIONS);
    persistedRegions = JSON.parse(str!);
} catch (e) {}

let persistedRegion = undefined;
try {
    const str = localStorage.getItem(REGION);
    persistedRegion = JSON.parse(str!);
} catch (e) {}

let persistedStoreInfo = undefined;
try {
    const str = localStorage.getItem(STORE);
    persistedStoreInfo = JSON.parse(str!);
} catch (e) {}

let persistedGamePreviews = undefined;
try {
    const str = localStorage.getItem(PREVIEWS);
    persistedGamePreviews = JSON.parse(str!);
} catch (e) {}

const initialStoreState: PlaystationStore = {
    info: persistedStoreInfo,
    previews: persistedGamePreviews,
};

const initialState: ReduxStoreState = {
    region: { regions: persistedRegions, current: persistedRegion } as RegionState,
    store: initialStoreState,
};

const middlewares: Middleware[] = [thunkMiddleware];
if (process.env.NODE_ENV === "development") {
    const loggerMiddleware = createLogger({
        level: "log",
        duration: true,
        timestamp: true,
        logErrors: true,
        collapsed: true,
    });
    middlewares.push(loggerMiddleware);
}
const middlewareEnhancer: StoreEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
let composedEnhancers: StoreEnhancer;
if (process.env.NODE_ENV === "development") {
    composedEnhancers = composeWithDevTools(...enhancers);
} else {
    composedEnhancers = compose(...enhancers);
}

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
