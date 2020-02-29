import React from "react";
import { PlaystationObject } from "playstation";
import { Card, CardContent, List, ListSubheader, ListItem, ListItemText } from "@material-ui/core";

export default class GameDetailVoiceCard extends React.Component<{ game: PlaystationObject }> {
    render() {
        return (
            <Card>
                <CardContent>
                    <List style={{ padding: 0 }} dense={true}>
                        <ListSubheader disableGutters style={{ fontSize: "inherit", lineHeight: "inherit" }}>
                            Audio
                        </ListSubheader>
                        {this.props.game.default_sku?.entitlements[0].voice_language_codes.map((voice: string) => {
                            return (
                                <ListItem style={{ padding: 0 }} alignItems="flex-start" dense={true} disableGutters>
                                    <ListItemText style={{ margin: 0 }}>{voice.toUpperCase()}</ListItemText>
                                </ListItem>
                            );
                        })}
                    </List>
                </CardContent>
            </Card>
        );
    }
}
