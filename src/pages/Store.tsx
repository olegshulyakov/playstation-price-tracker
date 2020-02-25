import React from "react";
import "./Store.css";
import PlayStationService from "../services/PlayStationService";
import GamePreview from "../components/GamePreview";

interface StoreProps {
    language: string;
    country: string;
}

interface StoreState {
    isLoaded: boolean;
    count: number | undefined;
    games: any[];
}

export default class Store extends React.Component<StoreProps, StoreState> {
    private readonly playStationService: PlayStationService;
    constructor(props: StoreProps) {
        super(props);
        this.playStationService = new PlayStationService(this.props.language, this.props.country);
        this.state = {
            isLoaded: false,
            count: undefined,
            games: [],
        };
    }

    syncWithPsStore() {
        this.playStationService.getStoreInfo().then((storeInfo) => {
            this.setState({ count: storeInfo.total_results });
            this.playStationService.getGamesList().then((links) => {
                this.setState({ games: links });
                this.setState({ isLoaded: true });
            });
        });
    }

    componentDidMount() {
        if (!this.props.country || !this.props.language) {
            console.error("No language or country specified.");
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
            return <GamePreview game={game} />;
        });
        return <div className="game-list">{games}</div>;
    }
}
