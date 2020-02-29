import React from "react";
import { PlaystationObject } from "playstation";
import { Typography } from "@material-ui/core";

export default class GameDetailVoiceCard extends React.Component<{ game: PlaystationObject }> {
    render() {
        return (
            <>
                <Typography variant="button">Audio</Typography>
                <Typography variant="body2">
                    {this.props.game.default_sku?.entitlements[0].voice_language_codes.map((voice: string) => {
                        return voice.toUpperCase() + " ";
                    })}
                </Typography>
            </>
        );
    }
}
