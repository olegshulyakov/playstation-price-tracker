import React from "react";
import { PlaystationObject } from "playstation";
import { Typography } from "@material-ui/core";

export default class GameDetailSubtitleCard extends React.Component<{ game: PlaystationObject }> {
    render() {
        return (
            <>
                <Typography variant="button">Subtitles</Typography>
                <Typography variant="body2">
                    {this.props.game.default_sku?.entitlements[0].subtitle_language_codes.map((voice: string) => {
                        return voice.toUpperCase() + " ";
                    })}
                </Typography>
            </>
        );
    }
}
