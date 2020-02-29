import React from "react";
import { PlaystationObject, Package } from "playstation";
import { Typography } from "@material-ui/core";

export default class GameDetailPlatformsCard extends React.Component<{ game: PlaystationObject }> {
    render() {
        return (
            <>
                <Typography variant="button">Platforms</Typography>
                <Typography variant="body2">
                    {this.props.game.default_sku?.entitlements[0].packages.map((pkg: Package) => {
                        return pkg.platformName.toUpperCase() + " ";
                    })}
                </Typography>
            </>
        );
    }
}
