import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Region } from "./react-app-env";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import GameDetail from "./pages/GameDetail";
import SelectRegion from "./pages/SelectRegion";

interface AppState {
    region: Region | undefined;
}

export default class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            region: undefined,
        };
    }

    render() {
        if (!this.state.region) {
            return (
                <div className="App">
                    <Header />
                    <SelectRegion />
                    <Footer />
                </div>
            );
        }
        return (
            <div className="App">
                <Header />
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={() => <Store language="ru" country="ru" />} />
                        <Route path="/game/:cusa" component={GameDetail} />
                    </Switch>
                </BrowserRouter>
                <Footer />
            </div>
        );
    }
}
