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
import { connect } from "react-redux";
import { fetchGamesStore } from "../actions/gameActions";
import GamePreview from "../components/GamePreview";
import { Grid } from "@material-ui/core";
import { StoreGridItem } from "../theme";
import { PlaystationRegion, PlaystationLink } from "playstation";

interface StoreProps {
    region: PlaystationRegion;
    count: number | undefined;
    games: PlaystationLink[];
    fetchGames: Function;
}

class Store extends React.Component<StoreProps> {
    componentDidMount() {
        if (!this.props.region) {
            console.error("No region specified.");
            return;
        }
        const region = this.props.region;
        if (!this.props.count && this.props.games.length === 0) {
            this.props.fetchGames(region.language, region.country);
        }
    }

    render() {
        if (this.props.games.length === 0)
            return (
                <div className="game-list-loader">
                    Loading games list... {this.props.count ? `${this.props.games.length} / ${this.props.count}` : ""}
                </div>
            );
        if (!this.props.games) {
            return <div>Cannot load games.</div>;
        }
        const games = this.props.games.slice().map((game) => {
            return (
                <StoreGridItem
                    key={"game-preview-" + game.id}
                    item
                    style={{ margin: "8px 8px 8px 8px", maxHeight: "240px", maxWidth: "240px" }}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2}
                    xl={3}
                >
                    <GamePreview game={game} />
                </StoreGridItem>
            );
        });
        return (
            <Grid container justify="center">
                {games}
            </Grid>
        );
    }
}

const mapStateToProps = (state: any) => ({ count: state.store.count, games: state.store.games } as StoreState);

export default connect(mapStateToProps, { fetchGames: fetchGamesStore })(Store);
