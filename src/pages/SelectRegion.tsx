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

import "./SelectRegion.css";
import React from "react";
import { PlaystationRegion } from "playstation";
import { playstationRegionList } from "../services/PlayStationService";
import { connect } from "react-redux";
import { selectRegion } from "../actions/regionActions";
import { clearGamesStore } from "../actions/gameActions";

export interface SelectRegionProps {
    selectRegion: Function;
    clearGamesStore: Function;
}

class SelectRegion extends React.Component<SelectRegionProps> {
    constructor(props: SelectRegionProps) {
        super(props);
        this.renderRegion = this.renderRegion.bind(this);
    }

    renderRegion(region: PlaystationRegion) {
        return (
            <div key={"region-" + region.name} className="SelectRegion-item">
                <div
                    className="SelectRegion-card"
                    onClick={() => {
                        this.props.clearGamesStore();
                        this.props.selectRegion(region);
                    }}
                >
                    <p className="SelectRegion-card-content Text-center">{region.name}</p>
                </div>
            </div>
        );
    }

    render() {
        const regions = playstationRegionList.map((region) => this.renderRegion(region));
        return (
            <div>
                <h1 className="Text-center">Please select your country / region</h1>
                <div className="Select-region-grid">{regions}</div>
            </div>
        );
    }
}

export default connect(null, { selectRegion: selectRegion, clearGamesStore: clearGamesStore })(SelectRegion);
