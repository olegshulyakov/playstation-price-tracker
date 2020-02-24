import React from "react";
import PlayStationService from "../services/PlayStationService";

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

    componentDidMount() {
        this.playStationService.getCount().then((count) => {
            this.setState({ count: count });
        });
    }

    render() {
        if (!this.state.isLoaded)
            return (
                <div>
                    Loading games list... {this.state.count ? `${this.state.games.length} / ${this.state.count}` : ""}
                </div>
            );
        return <div>We will display games here.</div>;
    }
}
