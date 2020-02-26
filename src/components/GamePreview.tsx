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
