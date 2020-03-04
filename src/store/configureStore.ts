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

import { createStore, applyMiddleware, StoreEnhancer, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "../middleware/logger";
import rootReducer from "../reducers";
import { REGION, STORE, GAMES } from "./keys";

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

let persistedStoreGames = undefined;
try {
    const str = localStorage.getItem(GAMES);
    persistedStoreGames = JSON.parse(str!);
} catch (e) {}

const initialStoreState: StoreState = {
    info: persistedStoreInfo,
    games: persistedStoreGames,
};
const initialState: ReduxStoreState = {
    region: persistedRegion,
    store: initialStoreState,
};

const middlewares = [loggerMiddleware, thunkMiddleware];
const middlewareEnhancer: StoreEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
let composedEnhancers: StoreEnhancer = compose(...enhancers);
if (process.env.NODE_ENV !== "production") {
    composedEnhancers = composeWithDevTools(...enhancers);
}

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
