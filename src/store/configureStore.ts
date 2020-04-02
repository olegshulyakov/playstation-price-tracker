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

import { applyMiddleware, compose, createStore, Middleware, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducers";
import { ROOT } from "./keys";

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

const persistConfig = {
    key: ROOT,
    storage,
    blacklist: ["store"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composedEnhancers);
const persistor = persistStore(store);

export { store, persistor };