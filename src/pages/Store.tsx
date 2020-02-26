import React from "react";
import "./Store.css";
import PlayStationService from "../services/PlayStationService";
import GamePreview from "../components/GamePreview";
import { PlaystationLink, PlaystationRegion } from "playstation";

interface StoreProps {
    region: PlaystationRegion;
}

interface StoreState {
    isLoaded: boolean;
    count: number | undefined;
    games: PlaystationLink[];
}

export default class Store extends React.Component<StoreProps, StoreState> {
    private readonly playStationService: PlayStationService;
    constructor(props: StoreProps) {
        super(props);
        this.playStationService = new PlayStationService(this.props.region.language, this.props.region.country);
        this.state = {
            isLoaded: false,
            count: undefined,
            games: [],
        };
    }

    syncWithPsStore() {
        this.playStationService
            .getStoreInfo()
            .then((storeInfo) => {
                this.setState({ count: storeInfo.total_results });
            })
            .then(() => this.playStationService.getGamesList())
            .then((links) => {
                this.setState({ games: links });
                this.setState({ isLoaded: true });
            });
    }

    componentDidMount() {
        if (!this.props.region) {
            console.error("No region specified.");
            return;
        }
        this.syncWithPsStore();
    }

    render() {
        if (!this.state.isLoaded)
            return (
                <div className="game-list-loader">
                    Loading games list... {this.state.count ? `${this.state.games.length} / ${this.state.count}` : ""}
                </div>
            );
        if (!this.state.games) {
            return <div>Cannot load games.</div>;
        }
        const games = this.state.games.slice().map((game) => {
            return <GamePreview key={"game-preview-" + game.id} game={game} />;
        });
        return <div className="game-list">{games}</div>;
    }
}
