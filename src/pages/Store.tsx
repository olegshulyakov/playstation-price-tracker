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

import "./Store.css";
import React from "react";
import { connect } from "react-redux";
import GamePreview from "../components/GamePreview";
import { Grid } from "@material-ui/core";
import { StoreGridItem } from "../theme";

interface StoreProps {
    store: StoreState;
}

class Store extends React.Component<StoreProps> {
    render() {
        if (!this.props.store || !this.props.store.previews) {
            return;
        }

        const games = this.props.store.previews.slice(0, 25).map((item) => {
            return (
                <StoreGridItem
                    key={"game-preview-" + item.key}
                    item
                    className="Store-grid-item"
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2}
                    xl={3}
                >
                    <GamePreview game={item.game} />
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

const mapStateToProps = (state: ReduxStoreState) => ({ store: state.store } as StoreProps);

export default connect(mapStateToProps)(Store);
