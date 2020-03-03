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
import { PlaystationRegion, Package } from "playstation";
import { Grid, Card, CardContent, Typography, Hidden } from "@material-ui/core";
import GameDetailMediaCard from "../components/GameDetailMediaCard";
import GameDetailAttributeCard from "../components/GameDetailAttributeCard";
import { RouteComponentProps, withRouter } from "react-router-dom";
import PlayStationGameService from "../services/PlayStationGameService";
import { connect } from "react-redux";

interface GameDetailProps extends RouteComponentProps<{ cusa: string }> {
    region: PlaystationRegion;
}

class GameDetail extends React.Component<GameDetailProps, GameDetailState> {
    private readonly playStationService: PlayStationService;
    private readonly playStationGameService: PlayStationGameService;
    private readonly cusa: string;
    constructor(props: any) {
        super(props);
        this.cusa = this.props.match.params.cusa;
        this.playStationService = new PlayStationService(this.props.region.language, this.props.region.country);
        this.playStationGameService = new PlayStationGameService(this.props.region.language, this.props.region.country);
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
        const game = this.state.game;
        if (!game || !game.name || !game.images) {
            this.props.history.push("/");
            return (
                <Typography variant="h5" align="center">
                    Oops... Cannot load game information
                </Typography>
            );
        }

        const gameLink = this.playStationGameService.getStoreGameLink(game.id);
        const platforms: string[] = [];
        const voices: string[] = [];
        const subtitles: string[] = [];
        for (const entitlement of game.default_sku?.entitlements) {
            entitlement.packages?.map((pkg: Package) => {
                platforms.push(pkg.platformName);
            });
            entitlement.voice_language_codes?.map((voice: string) => {
                voices.push(voice);
            });
            entitlement.subtitle_language_codes?.map((subtitle: string) => {
                subtitles.push(subtitle);
            });
        }

        return (
            <Grid key={"game-detail-" + game.id} container>
                <Hidden smUp>
                    <Grid item xs={12} sm={12}>
                        <GameDetailMediaCard playStationGameService={this.playStationGameService} game={game} />
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
                                        {game.name}
                                        {game.content_rating?.url ? (
                                            <img
                                                src={game.content_rating?.url}
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
                                        dangerouslySetInnerHTML={{ __html: game.long_desc }}
                                    ></div>
                                </Grid>

                                <Grid item lg={1} xl={1} />

                                <Grid item sm={4} md={3} lg={2} xl={2}>
                                    <Hidden xsDown>
                                        <GameDetailMediaCard
                                            playStationGameService={this.playStationGameService}
                                            game={game}
                                        />
                                        <div style={{ height: "16px" }}></div>
                                        <GameDetailAttributeCard attribute="Platforms" values={platforms} />
                                        <div style={{ height: "16px" }}></div>
                                        <GameDetailAttributeCard attribute="Audio" values={voices} />
                                        <div style={{ height: "16px" }}></div>
                                        <GameDetailAttributeCard attribute="Subtitles" values={subtitles} />
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

const mapStateToProps = (state: ReduxStoreState) => ({ region: state.region });

export default connect(mapStateToProps)(withRouter(GameDetail));
