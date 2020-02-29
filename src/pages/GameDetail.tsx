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
import PlayStationService from "../services/PlayStationService";
import { PlaystationObject } from "playstation";
import { Grid, Card, CardContent, Typography, Hidden } from "@material-ui/core";
import GameDetailMediaCard from "../components/GameDetailMediaCard";
import GameDetailPlatformsCard from "../components/GameDetailPlatformsCard";
import GameDetailVoiceCard from "../components/GameDetailVoiceCard";
import GameDetailSubtitleCard from "../components/GameDetailSubtitleCard";

interface GameDetailState {
    isLoaded: boolean;
    game: PlaystationObject | undefined;
}

export default class GameDetail extends React.Component<any, GameDetailState> {
    private readonly playStationService: PlayStationService;
    private readonly cusa: string;
    constructor(props: any) {
        super(props);
        this.cusa = this.props.match.params.cusa;
        this.playStationService = new PlayStationService("ru", "ru");
        this.state = {
            isLoaded: false,
            game: undefined,
        };
    }

    componentDidMount() {
        if (!this.cusa) {
            return;
        }
        this.playStationService.getGameInfo(this.cusa).then((game) => {
            this.setState({ isLoaded: true, game: game });
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <Typography variant="h5" align="center">
                    Loading game information...
                </Typography>
            );
        }
        if (!this.state.game || !this.state.game.name || !this.state.game.images) {
            return (
                <Typography variant="h5" align="center">
                    Oops... Cannot load game information
                </Typography>
            );
        }

        return (
            <Grid key={"game-detail-" + this.state.game.id} container>
                <Grid item lg={1} xl={1}></Grid>

                <Hidden smUp>
                    <Grid item xs={12}>
                        <GameDetailMediaCard playStationService={this.playStationService} game={this.state.game} />
                    </Grid>
                </Hidden>

                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h3">{this.state.game.name}</Typography>

                            <div
                                className="game-detail-description"
                                dangerouslySetInnerHTML={{ __html: this.state.game.long_desc }}
                            ></div>
                        </CardContent>
                    </Card>
                </Grid>

                <Hidden xsDown>
                    <Grid item sm={4} md={4} lg={2} xl={2} style={{ marginLeft: "0px" }}>
                        <GameDetailMediaCard playStationService={this.playStationService} game={this.state.game} />
                        <div style={{ height: "16px" }}></div>
                        <GameDetailPlatformsCard game={this.state.game} />
                        <div style={{ height: "16px" }}></div>
                        <GameDetailVoiceCard game={this.state.game} />
                        <div style={{ height: "16px" }}></div>
                        <GameDetailSubtitleCard game={this.state.game} />
                    </Grid>
                </Hidden>

                <Grid item lg={1} xl={1}></Grid>
            </Grid>
        );
    }
}
