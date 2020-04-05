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

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { persistor, store } from "./store/configureStore";
import { APP_VERSION } from "./store/keys";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./pages/About";
import GameDetail from "./pages/GameDetail";
import { PersistGate } from "redux-persist/integration/react";

const previousAppVersion = localStorage.getItem(APP_VERSION);
const appVersion = `${process.env.REACT_APP_VERSION}`;
if (previousAppVersion && previousAppVersion !== appVersion) {
    localStorage.clear();
}
localStorage.setItem(APP_VERSION, appVersion);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={() => <App />} />
                    <Route path="/about" exact component={() => <About />} />
                    <Route path="/game/:cusa" component={() => <GameDetail />} />
                </Switch>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
