import React from "react";
import PlayStationService from "../services/PlayStationService";
import { PlaystationObject } from "playstation";

interface GameDetailState {
    isLoaded: boolean;
    game: PlaystationObject | undefined;
}

export default class GameDetail extends React.Component<any, GameDetailState> {
    private readonly playStationService: PlayStationService;
    private readonly cusa: string;
    constructor(props: any) {
        super(props);
        this.cusa = this.props.match.params.cusa;
        this.playStationService = new PlayStationService("ru", "ru");
        this.state = {
            isLoaded: false,
            game: undefined,
        };
    }

    componentDidMount() {
        if (!this.cusa) {
            return;
        }
        this.playStationService.getGameInfo(this.cusa).then((game) => {
            this.setState({ isLoaded: true, game: game });
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return <div className="game-list-loader">Loading game information...</div>;
        }
        if (!this.state.game) {
            return <div className="game-list-loader">Oops... Cannot load game information</div>;
        }
        return (
            <div key={"game-detail-" + this.state.game.id} className="game-detail">
                <h1>{this.state.game.name}</h1>
                <img
                    className="game-detail-image"
                    src={this.state.game.images[0].url}
                    alt={this.state.game.name}
                    loading="lazy"
                    placeholder={this.state.game.name}
                ></img>
                <a
                    className="game-detail-price"
                    href={this.playStationService.getStoreGameLink(this.cusa)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {this.state.game.default_sku ? this.state.game.default_sku.display_price : ""}
                </a>

                <div
                    className="game-detail-description"
                    dangerouslySetInnerHTML={{ __html: this.state.game.long_desc }}
                ></div>
            </div>
        );
    }
}
