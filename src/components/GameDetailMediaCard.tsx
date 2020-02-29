import React from "react";
import { PlaystationObject } from "playstation";
import PlayStationService from "../services/PlayStationService";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

export default class GameDetailMediaCard extends React.Component<{
    playStationService: PlayStationService;
    game: PlaystationObject;
}> {
    render() {
        return (
            <Card>
                <CardMedia
                    component="img"
                    loading="lazy"
                    image={this.props.game.images[0].url}
                    title={this.props.game.name}
                    placeholder={this.props.game.name}
                />

                <CardContent>
                    <Typography variant="h5">
                        <a
                            className="game-detail-price"
                            href={this.props.playStationService.getStoreGameLink(this.props.game.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.props.game.default_sku ? this.props.game.default_sku.display_price : ""}
                        </a>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}
