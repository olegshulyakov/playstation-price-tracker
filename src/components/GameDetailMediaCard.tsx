import React from "react";
import { PlaystationObject } from "playstation";
import PlayStationService from "../services/PlayStationService";
import { Card, CardMedia, CardActions } from "@material-ui/core";

export default class GameDetailMediaCard extends React.Component<{
    playStationService: PlayStationService;
    game: PlaystationObject;
}> {
    render() {
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
                    {this.props.game.default_sku?.rewards[0].display_price ? (
                        <div className="game-detail-price">{this.props.game.default_sku?.rewards[0].display_price}</div>
                    ) : this.props.game.default_sku ? (
                        <div className="game-detail-price">{this.props.game.default_sku.display_price}</div>
                    ) : (
                        <></>
                    )}

                    {this.props.game.default_sku?.rewards[0].bonus_display_price ? (
                        <div className="game-detail-ps-plus-price">
                            {this.props.game.default_sku?.rewards[0].bonus_display_price}
                        </div>
                    ) : (
                        <></>
                    )}
                </CardActions>
            </Card>
        );
    }
}
