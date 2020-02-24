import React from "react";
import "./GamePreview.css";
import { Link } from "playstation";

export interface GamePreviewProps {
    game: Link;
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
                <a className="game-preview-link" href={this.props.game.url} target="_blank" rel="noopener noreferrer">
                    {this.props.game.name}
                </a>
            </div>
        );
    }
}
