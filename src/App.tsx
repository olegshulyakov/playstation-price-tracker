import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { PlaystationRegion } from "playstation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import GameDetail from "./pages/GameDetail";
import SelectRegion from "./pages/SelectRegion";

interface AppState {
    region: PlaystationRegion | undefined;
}

export default class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            region: undefined,
        };
        this.onSelectRegion = this.onSelectRegion.bind(this);
    }

    onSelectRegion(region: PlaystationRegion) {
        console.debug(`Changing region from ${this.state.region?.name} to ${region.name}`);
        this.setState({ region: region });
    }

    render() {
        if (!this.state.region) {
            return (
                <div className="App">
                    <Header />
                    <SelectRegion onSelectRegion={(region: PlaystationRegion) => this.onSelectRegion(region)} />
                    <Footer />
                </div>
            );
        }
        const region = this.state.region;
        return (
            <div className="App">
                <Header />
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={() => <Store region={region} />} />
                        <Route path="/game/:cusa" component={GameDetail} />
                    </Switch>
                </BrowserRouter>
                <Footer />
            </div>
        );
    }
}
