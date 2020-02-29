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
import { PlaystationObject, PlaystationRegion } from "playstation";
import { Grid, Card, CardContent, Typography, Hidden } from "@material-ui/core";
import GameDetailMediaCard from "../components/GameDetailMediaCard";
import GameDetailPlatformsCard from "../components/GameDetailPlatformsCard";
import GameDetailVoiceCard from "../components/GameDetailVoiceCard";
import GameDetailSubtitleCard from "../components/GameDetailSubtitleCard";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface GameDetailProps extends RouteComponentProps<{ cusa: string }> {
    region: PlaystationRegion;
}

interface GameDetailState {
    isLoaded: boolean;
    game: PlaystationObject | undefined;
}

class GameDetail extends React.Component<GameDetailProps, GameDetailState> {
    private readonly playStationService: PlayStationService;
    private readonly cusa: string;
    constructor(props: any) {
        super(props);
        this.cusa = this.props.match.params.cusa;
        this.playStationService = new PlayStationService(this.props.region.language, this.props.region.country);
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
            this.props.history.push("/");
            return (
                <Typography variant="h5" align="center">
                    Oops... Cannot load game information
                </Typography>
            );
        }

        const gameLink = this.playStationService.getStoreGameLink(this.state.game.id);

        return (
            <Grid key={"game-detail-" + this.state.game.id} container>
                <Hidden smUp>
                    <Grid item xs={12} sm={12}>
                        <GameDetailMediaCard playStationService={this.playStationService} game={this.state.game} />
                    </Grid>
                </Hidden>

                <Grid item md={1} lg={1} xl={1}></Grid>

                <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12} sm={8} md={8} lg={9} xl={9}>
                                    <Typography
                                        style={{ cursor: "pointer" }}
                                        variant="h3"
                                        onClick={() => {
                                            window.open(gameLink, "_blank");
                                        }}
                                    >
                                        {this.state.game.name}
                                        {this.state.game.content_rating?.url ? (
                                            <img
                                                src={this.state.game.content_rating?.url}
                                                loading="eager"
                                                alt="rating"
                                                height="45px"
                                                width="45px"
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </Typography>

                                    <div
                                        className="game-detail-description"
                                        dangerouslySetInnerHTML={{ __html: this.state.game.long_desc }}
                                    ></div>
                                </Grid>

                                <Grid item lg={1} xl={1} />

                                <Grid item sm={4} md={3} lg={2} xl={2}>
                                    <Hidden xsDown>
                                        <GameDetailMediaCard
                                            playStationService={this.playStationService}
                                            game={this.state.game}
                                        />
                                        <div style={{ height: "16px" }}></div>
                                        <GameDetailPlatformsCard game={this.state.game} />
                                        <div style={{ height: "16px" }}></div>
                                        <GameDetailVoiceCard game={this.state.game} />
                                        <div style={{ height: "16px" }}></div>
                                        <GameDetailSubtitleCard game={this.state.game} />
                                    </Hidden>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item md={1} lg={1} xl={1}></Grid>
            </Grid>
        );
    }
}

export default withRouter(GameDetail);
