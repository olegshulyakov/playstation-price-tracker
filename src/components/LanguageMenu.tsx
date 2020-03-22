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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { selectRegion } from "../actions/regionActions";
import { clearGamesStore } from "../actions/gameActions";
import { PlaystationRegion } from "../services/Playstation/types";
import { Dropdown } from "react-bootstrap";

interface LanguageMenuProps extends RegionState {
    selectRegion: Function;
    clearGamesStore: Function;
}

class LanguageMenu extends React.Component<LanguageMenuProps> {
    constructor(props: LanguageMenuProps) {
        super(props);
        this.renderRegion = this.renderRegion.bind(this);
        this.onSelectRegion = this.onSelectRegion.bind(this);
    }

    onSelectRegion(region: PlaystationRegion) {
        this.props.clearGamesStore();
        this.props.selectRegion(region);
    }

    renderRegion(region: PlaystationRegion) {
        let styledName;
        if (!this.props.current || this.props.current.name !== region.name) {
            styledName = region.name;
        } else {
            styledName = <b>{region.name}</b>;
        }

        return (
            <Dropdown.Item
                key={"dropdown-region-" + region.name}
                onClick={() => {
                    this.onSelectRegion(region);
                }}
            >
                {styledName}
            </Dropdown.Item>
        );
    }

    render() {
        const regions = this.props.regions.map((region) => this.renderRegion(region));

        return (
            <Dropdown>
                <Dropdown.Toggle id="language-menu" size="sm" style={{
                    marginRight: "0.25rem",
                    border: 0,
                    color: "var(--text-secondary)",
                    backgroundColor: "transparent",
                    fontSize: "0.8rem",
                }}>
                    <FontAwesomeIcon icon={faLanguage} size="2x"/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {regions}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

const mapStateToProps = (state: ReduxStoreState) =>
    ({ current: state.region.current, regions: state.region.regions } as RegionState);

export default connect(mapStateToProps, { selectRegion: selectRegion, clearGamesStore: clearGamesStore })(LanguageMenu);
