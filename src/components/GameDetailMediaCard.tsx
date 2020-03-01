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
import { PlaystationObject } from "playstation";
import PlayStationGameService from "../services/PlayStationGameService";
import { Card, CardMedia, CardActions } from "@material-ui/core";

interface GameDetailMediaCardProps {
    playStationGameService: PlayStationGameService;
    game: PlaystationObject;
}

export default class GameDetailMediaCard extends React.Component<GameDetailMediaCardProps> {
    render() {
        const currentPrice = this.props.playStationGameService.getCurrentPrice(this.props.game);
        const psPlusPrice = this.props.playStationGameService.getPsPlusPrice(this.props.game);

        return (
            <Card
                style={{ cursor: "pointer" }}
                onClick={() => {
                    window.open(this.props.playStationGameService.getStoreGameLink(this.props.game.id), "_blank");
                }}
            >
                <CardMedia
                    component="img"
                    loading="lazy"
                    image={this.props.playStationGameService.getPreviewImage(this.props.game)}
                    title={this.props.game.name}
                    placeholder={this.props.game.name}
                />

                <CardActions>
                    {currentPrice ? <div className="game-detail-price">{currentPrice}</div> : <></>}
                    {psPlusPrice ? <div className="game-detail-ps-plus-price">{psPlusPrice}</div> : <></>}
                </CardActions>
            </Card>
        );
    }
}
