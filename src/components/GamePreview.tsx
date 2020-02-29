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
import { PlaystationLink } from "playstation";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { CardMedia, CardActionArea } from "@material-ui/core";
import { GamePreviewBadge, GamePreviewCard } from "../theme";

export interface GamePreviewProps extends RouteComponentProps {
    game: PlaystationLink;
}

class GamePreview extends React.Component<GamePreviewProps> {
    constructor(props: GamePreviewProps) {
        super(props);
        this.handleGameClick = this.handleGameClick.bind(this);
    }

    handleGameClick(id: string) {
        this.props.history.push("/game/" + id);
    }

    render() {
        return (
            <GamePreviewBadge
                badgeContent={this.props.game.default_sku.display_price}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <GamePreviewCard>
                    <CardActionArea onClick={() => this.handleGameClick(this.props.game.id)}>
                        <CardMedia
                            component="img"
                            alt={this.props.game.name}
                            height="240"
                            width="240"
                            loading="lazy"
                            image={this.props.game.images[0].url}
                            title={this.props.game.name}
                            placeholder={this.props.game.name}
                        />
                    </CardActionArea>
                </GamePreviewCard>
            </GamePreviewBadge>
        );
    }
}

export default withRouter(GamePreview);
