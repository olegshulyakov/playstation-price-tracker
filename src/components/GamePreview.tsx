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
import { PlaystationItemPreview } from "playstation";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { CardMedia, CardActionArea } from "@material-ui/core";
import { GamePreviewBadge, GamePreviewCard } from "../theme";

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
        return (
            <GamePreviewCard>
                <CardActionArea onClick={() => this.handleGameClick(this.props.game)}>
                    <GamePreviewBadge
                        className={this.props.game.is_sale ? "Game-detail-price" : "Game-detail-sale-price"}
                        badgeContent={this.props.game.display_price}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                    >
                        <CardMedia
                            component="img"
                            alt={this.props.game.name}
                            height="240"
                            width="240"
                            loading="lazy"
                            image={this.props.game.image}
                            title={this.props.game.name}
                            placeholder={this.props.game.name}
                        />
                    </GamePreviewBadge>
                </CardActionArea>
            </GamePreviewCard>
        );
    }
}

export default withRouter(GamePreview);
