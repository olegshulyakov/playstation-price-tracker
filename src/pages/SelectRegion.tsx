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
import { PlaystationRegion } from "playstation";
import { playstationRegionList } from "../services/PlayStationService";

export interface SelectRegionProps {
    onSelectRegion: any;
}

export default class SelectRegion extends React.Component<SelectRegionProps> {
    constructor(props: SelectRegionProps) {
        super(props);
        this.renderRegion = this.renderRegion.bind(this);
    }

    renderRegion(region: PlaystationRegion) {
        return (
            <button key={"region-" + region.name} onClick={() => this.props.onSelectRegion(region)}>
                {region.name}
            </button>
        );
    }

    render() {
        const regions = playstationRegionList.map((region) => this.renderRegion(region));
        return (
            <div className="select-region">
                <img
                    className="select-region-logo"
                    src="https://www.playstation.com/country-selector/img/logotype/logo_PS.svg"
                    alt="PS logo"
                    loading="lazy"
                    placeholder="Playstation logo"
                ></img>
                <h1>Please select your country / region</h1>
                <div>{regions}</div>
            </div>
        );
    }
}
