import React from "react";
import "./GamePreview.css";
import { PlaystationLink } from "playstation";
import { Link } from "react-router-dom";

export interface GamePreviewProps {
    game: PlaystationLink;
}

export default class GamePreview extends React.Component<GamePreviewProps> {
    render() {
        return (
            <div key={"game-preview-" + this.props.game.id} className="game-preview">
                <img
                    className="game-preview-image"
                    src={this.props.game.images[0].url}
                    alt={this.props.game.short_name}
                    loading="lazy"
                    placeholder={this.props.game.name}
                ></img>
                <p>
                    <Link
                        to={"/game/" + this.props.game.id}
                        className="game-details-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {this.props.game.name}
                    </Link>
                </p>
                <p>
                    <a
                        className="game-preview-link"
                        href={this.props.game.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {this.props.game.default_sku.display_price}
                    </a>
                </p>
            </div>
        );
    }
}
