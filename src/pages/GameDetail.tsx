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

import "./GameDetail.css";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Card, CardContent, Typography, Hidden } from "@material-ui/core";
import { PlaystationRegion, Package, PlaystationObject } from "playstation";
import { GAME } from "../store/keys";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GameDetailMediaCard from "../components/GameDetailMediaCard";
import GameDetailAttributeCard from "../components/GameDetailAttributeCard";
import { getStoreGameLink } from "../services/PlayStationGameService";

interface GameDetailProps extends RouteComponentProps<{ cusa: string }> {
    region: PlaystationRegion;
}

class GameDetail extends React.Component<GameDetailProps, GameDetailState> {
    private readonly cusa: string;
    private readonly url: string;
    constructor(props: any) {
        super(props);
        this.cusa = this.props.match.params.cusa;
        this.url = this.props.location.state ? (this.props.location.state as string) : "";

        try {
            const sessionItem = sessionStorage.getItem(GAME + this.cusa);
            const game = JSON.parse(sessionItem!) as PlaystationObject;
            // TODO check session item timestamp and clear if old.
            this.state = {
                isLoaded: true,
                game: game,
            };
        } catch (e) {
            this.state = {
                isLoaded: false,
                game: undefined,
            };
        }
    }

    isCorruptedData(): boolean {
        return !this.cusa || !this.url;
    }

    componentDidMount() {
        if (this.isCorruptedData()) {
            return;
        }
        if (this.state.isLoaded && this.state.game) {
            return;
        }

        fetch(this.url)
            .then((response) => response.json())
            .then((json: any) => {
                const game = json as PlaystationObject;
                this.setState({ isLoaded: true, game: game });
                sessionStorage.setItem(GAME + this.cusa, JSON.stringify(game));
            })
            .catch((e) => console.error(`Cannot load game data, [${this.cusa}].`, e));
    }

    render() {
        if (this.isCorruptedData()) {
            return <></>;
        }

        const game = this.state.game;
        if (!this.state.isLoaded || !game || !game.name || !game.images) {
            return <LoadingSpinner msg={<p>Loading game information...</p>} />;
        }

        const spaceElement = <div style={{ height: "2vh" }}></div>;
        const gameLink = getStoreGameLink(game.id, this.props.region.language, this.props.region.country);
        const platforms = new Set<string>();
        const voices = new Set<string>();
        const subtitles = new Set<string>();
        for (const platform of game.playable_platform) {
            platforms.add(platform.substring(0, platform.indexOf("™")).toUpperCase());
        }
        for (const entitlement of game.default_sku?.entitlements) {
            entitlement.packages?.map((pkg: Package) => {
                platforms.add(pkg.platformName.toUpperCase());
            });
            entitlement.voice_language_codes?.map((voice: string) => {
                voices.add(voice.toUpperCase());
            });
            entitlement.subtitle_language_codes?.map((subtitle: string) => {
                subtitles.add(subtitle.toUpperCase());
            });
        }

        return (
            <div className="Game-detail-flex">
                <Header isSearchEnabled={true} />
                <div key={"game-detail-" + game.id} className="Game-detail-container">
                    <Hidden smUp>
                        <Grid item xs={12} sm={12}>
                            <GameDetailMediaCard region={this.props.region} game={game} />
                        </Grid>
                    </Hidden>

                    <Grid item md={1} lg={1} xl={1}></Grid>

                    <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                        <Card>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12} sm={8} md={8} lg={9} xl={9}>
                                        <Typography
                                            className="App-clickable"
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
                                            className="Game-detail-description"
                                            dangerouslySetInnerHTML={{ __html: game.long_desc }}
                                        ></div>
                                    </Grid>

                                    <Grid item lg={1} xl={1} />

                                    <Grid item sm={4} md={3} lg={2} xl={2}>
                                        <Hidden xsDown>
                                            <GameDetailMediaCard region={this.props.region} game={game} />
                                            {spaceElement}
                                            <GameDetailAttributeCard
                                                attribute="Platforms"
                                                values={[...platforms.keys()]}
                                            />
                                            {spaceElement}
                                            <GameDetailAttributeCard attribute="Audio" values={[...voices.keys()]} />
                                            {spaceElement}
                                            <GameDetailAttributeCard
                                                attribute="Subtitles"
                                                values={[...subtitles.keys()]}
                                            />
                                        </Hidden>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item md={1} lg={1} xl={1}></Grid>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state: ReduxStoreState) => ({ region: state.region });

export default withRouter(connect(mapStateToProps)(GameDetail));
