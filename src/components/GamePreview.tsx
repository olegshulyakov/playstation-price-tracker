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

import "./GamePreview.css";
import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { PlaystationItemPreview } from "playstation";

export interface GamePreviewProps extends RouteComponentProps {
    game: PlaystationItemPreview;
}

class GamePreview extends React.Component<GamePreviewProps> {
    constructor(props: GamePreviewProps) {
        super(props);
        this.handleGameClick = this.handleGameClick.bind(this);
    }

    handleGameClick(game: PlaystationItemPreview) {
        this.props.history.push({ pathname: "/game/" + game.id, state: game.url });
    }

    render() {
        const prices = [];
        prices.push(
            <span
                key={"game-preview-price-" + this.props.game.id}
                className={
                    this.props.game.is_sale
                        ? "Game-preview-badge-price Game-preview-badge-price-sale"
                        : "Game-preview-badge-price Game-preview-badge-price-default"
                }
            >
                {this.props.game.display_price}
            </span>,
        );
        if (this.props.game.bonus_price) {
            prices.push(
                <span
                    key={"game-preview-ps-plus-price-" + this.props.game.id}
                    className="Game-preview-badge-price Game-preview-badge-price-ps-plus"
                >
                    {this.props.game.bonus_price}
                </span>,
            );
        }

        return (
            <div className="Game-preview-item With-shadow" onClick={() => this.handleGameClick(this.props.game)}>
                <span className="Game-preview-image">
                    <img
                        className="Game-preview-image"
                        src={this.props.game.image}
                        loading="lazy"
                        alt={this.props.game.name}
                        title={this.props.game.name}
                        placeholder={this.props.game.name}
                    />

                    <span className="Game-preview-badge">{prices}</span>
                </span>
            </div>
        );
    }
}

export default withRouter(GamePreview);
