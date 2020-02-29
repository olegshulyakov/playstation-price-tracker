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
import PlayStationService from "../services/PlayStationService";
import { Card, CardMedia, CardActions } from "@material-ui/core";

export default class GameDetailMediaCard extends React.Component<{
    playStationService: PlayStationService;
    game: PlaystationObject;
}> {
    render() {
        let price = <></>;
        if (
            this.props.game.default_sku?.rewards &&
            this.props.game.default_sku?.rewards.length > 1 &&
            this.props.game.default_sku?.rewards[0].display_price
        ) {
            price = <div className="game-detail-price">{this.props.game.default_sku.rewards[0].display_price}</div>;
        } else if (this.props.game.default_sku) {
            price = <div className="game-detail-price">{this.props.game.default_sku.display_price}</div>;
        }

        let psPlusPrice = <></>;
        if (
            this.props.game.default_sku?.rewards &&
            this.props.game.default_sku?.rewards.length > 1 &&
            this.props.game.default_sku?.rewards[0].bonus_display_price
        ) {
            psPlusPrice = (
                <div className="game-detail-ps-plus-price">
                    {this.props.game.default_sku.rewards[0].bonus_display_price}
                </div>
            );
        }
        return (
            <Card
                style={{ cursor: "pointer" }}
                onClick={() => {
                    window.open(this.props.playStationService.getStoreGameLink(this.props.game.id), "_blank");
                }}
            >
                <CardMedia
                    component="img"
                    loading="lazy"
                    image={this.props.game.images[0].url}
                    title={this.props.game.name}
                    placeholder={this.props.game.name}
                />

                <CardActions>
                    {price}

                    {psPlusPrice}
                </CardActions>
            </Card>
        );
    }
}
