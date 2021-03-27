/*
 * Copyright (c) 2020. Oleg Shulyakov
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

import "./index.css";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as PlaystationApi from "playstation-api";
import { GAME } from "../../store/keys";
import LoadingSpinner from "../../components/LoadingSpinner";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MediaCard from "./MediaCard";
import AttributeCard from "./AttributeCard";
import { HiddenDesktop, GameDetailTitle, GameDetailDescription, HiddenMobile, SpaceElement } from "./styles";

interface Props extends RouteComponentProps<{ cusa: string }>, React.HTMLProps<any> {
    region: PlaystationApi.types.PlaystationRegion;
}

const GameDetail: React.FC<Props> = (props: Props) => {
    const cusa: string = props.match.params.cusa;
    const url: string = props.location.state ? (props.location.state as string) : "";
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [game, setGame] = React.useState<any | undefined>(undefined);

    try {
        const sessionItem = sessionStorage.getItem(GAME + cusa);
        const item = JSON.parse(sessionItem!) as PlaystationApi.types.PlaystationResponse;
        // TODO check session item timestamp and clear if old.
        setIsLoaded(true);
        setGame(item);
    } catch (e) {
        setIsLoaded(false);
        setGame(undefined);
    }

    const isCorruptedData = !cusa || !url;

    React.useEffect(() => {
        if (isCorruptedData) {
            return;
        }
        if (isLoaded && game) {
            return;
        }

        fetch(url)
            .then((response) => response.json())
            .then((json: any) => {
                const item = json as PlaystationApi.types.PlaystationResponse;
                setIsLoaded(true);
                setGame(item);
                sessionStorage.setItem(GAME + cusa, JSON.stringify(game));
            })
            .catch((e) => console.error(`Cannot load game data, [${cusa}].`, e));
    }, []);

    if (isCorruptedData) {
        return <></>;
    }

    if (!isLoaded || !game || !game.name || !game.images) {
        return <LoadingSpinner msg={<p>Loading game information...</p>} />;
    }

    const gameLink = PlaystationApi.helpers.getStoreGameLink(props.region, game.id);
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
            <Header />
            <Container>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {game.name}
                        </li>
                    </ol>
                </nav>
                <Row>
                    <Col xs={12} sm={0} md={0} lg={0} xl={0}>
                        <HiddenDesktop>
                            <MediaCard region={props.region} game={game} />
                        </HiddenDesktop>
                    </Col>

                    <Col xs={12} sm={9} md={9} lg={9} xl={9}>
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

                        <GameDetailDescription dangerouslySetInnerHTML={{ __html: game.long_desc }} />
                    </Col>

                    <Col xs={0} sm={3} md={3} lg={3} xl={3}>
                        <HiddenMobile>
                            <MediaCard region={props.region} game={game} />
                            <SpaceElement />
                            <AttributeCard attribute="Platforms" values={[...platforms.keys()]} />
                            <SpaceElement />
                            <AttributeCard attribute="Audio" values={[...voices.keys()]} />
                            <SpaceElement />
                            <AttributeCard attribute="Subtitles" values={[...subtitles.keys()]} />
                        </HiddenMobile>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

const mapStateToProps = (state: ReduxStoreState) => ({ region: state.region.current });

export default withRouter(connect(mapStateToProps)(GameDetail));
