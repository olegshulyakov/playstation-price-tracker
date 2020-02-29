import React from "react";
import { PlaystationObject, Package } from "playstation";
import { Card, CardContent, List, ListSubheader, ListItem, ListItemText } from "@material-ui/core";

export default class GameDetailPlatformsCard extends React.Component<{ game: PlaystationObject }> {
    render() {
        return (
            <Card>
                <CardContent>
                    <List style={{ padding: 0 }} dense={true}>
                        <ListSubheader disableGutters style={{ fontSize: "inherit", lineHeight: "inherit" }}>
                            Platforms
                        </ListSubheader>
                        {this.props.game.default_sku?.entitlements[0].packages.map((pkg: Package) => {
                            return (
                                <ListItem style={{ padding: 0 }} alignItems="flex-start" dense={true} disableGutters>
                                    <ListItemText style={{ margin: 0 }}>{pkg.platformName.toUpperCase()}</ListItemText>
                                </ListItem>
                            );
                        })}
                    </List>
                </CardContent>
            </Card>
        );
    }
}
