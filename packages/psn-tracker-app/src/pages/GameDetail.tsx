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
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { GAME } from "../store/keys";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GameDetailMediaCard from "../components/GameDetailMediaCard";
import GameDetailAttributeCard from "../components/GameDetailAttributeCard";
import * as PlaystationApi from "playstation-api";

const GameDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0.5rem 0.5rem 3rem;

    @media screen and (min-width: 600px) {
        padding: 3rem 1rem 0.5rem;
    }
`;

const GameDetailGrid = styled.div`
    display: grid;
    gap: 0;
    background-color: var(--br-card);
    justify-content: center;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    padding: 0.5rem 0.5rem 3rem;

    @media screen and (min-width: 600px) {
        grid-template-columns: auto 15rem;
        grid-template-rows: auto;
        gap: 1rem;
        padding: 3rem 2rem 1rem;
    }

    @media screen and (min-width: 1280px) {
        gap: 3rem;
        margin: 0 5rem;
        box-shadow: var(--box-shadow-card);
    }
`;

const GameDetailTitle = styled.h3`
    margin: 0;
    font-size: 3rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.167;
    letter-spacing: 0;
    cursor: pointer;
`;

const GameDetailDescription = styled.div`
    font-size: 0.9rem;
`;

const SpaceElement = styled.div`
    height: 0.5rem;
`;

const HiddenMobile = styled.div`
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const HiddenDesktop = styled.div`
    @media screen and (min-width: 600px) {
        display: none;
    }
`;

interface GameDetailProps extends RouteComponentProps<{ cusa: string }> {
    region: PlaystationApi.types.PlaystationRegion;
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
            const game = JSON.parse(sessionItem!) as PlaystationApi.types.PlaystationResponse;
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
                const game = json as PlaystationApi.types.PlaystationResponse;
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
            return <LoadingSpinner msg={<p>Loading game information...</p>}/>;
        }

        const gameLink = PlaystationApi.helpers.getStoreGameLink(this.props.region, game.id);
        const platforms = new Set<string>();
        const voices = new Set<string>();
        const subtitles = new Set<string>();
        for (const platform of game.playable_platform) {
            platforms.add(platform.substring(0, platform.indexOf("™")).toUpperCase());
        }
        for (const entitlement of game.default_sku?.entitlements) {
            entitlement.packages?.map((pkg: PlaystationApi.types.Package) => {
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
            <>
            <Header isSearchEnabled={true}/>
            <GameDetailContainer>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{game.name}</li>
                    </ol>
                </nav>
                <GameDetailGrid>
                    <HiddenDesktop>
                        <GameDetailMediaCard region={this.props.region} game={game}/>
                    </HiddenDesktop>

                    <div>
                        <GameDetailTitle
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
                        </GameDetailTitle>

                        <GameDetailDescription dangerouslySetInnerHTML={{ __html: game.long_desc }}/>
                    </div>

                    <HiddenMobile>
                        <GameDetailMediaCard region={this.props.region} game={game}/>
                        <SpaceElement/>
                        <GameDetailAttributeCard attribute="Platforms" values={[...platforms.keys()]}/>
                        <SpaceElement/>
                        <GameDetailAttributeCard attribute="Audio" values={[...voices.keys()]}/>
                        <SpaceElement/>
                        <GameDetailAttributeCard attribute="Subtitles" values={[...subtitles.keys()]}/>
                    </HiddenMobile>
                </GameDetailGrid>
                <Footer/>
            </GameDetailContainer>
            </>
        );
    }
}

const mapStateToProps = (state: ReduxStoreState) => ({ region: state.region.current });

export default withRouter(connect(mapStateToProps)(GameDetail));
