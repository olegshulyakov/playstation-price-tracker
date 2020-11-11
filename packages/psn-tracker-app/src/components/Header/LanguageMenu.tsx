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

import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { selectRegion } from "../../actions/regionActions";
import { clearGamesStore } from "../../actions/gameActions";
import { Dropdown } from "react-bootstrap";
import * as PlaystationApi from "playstation-api";

interface Props extends RegionState, React.HTMLProps<any> {
    selectRegion: Function;
    clearGamesStore: Function;
}

const LanguageMenu: React.FC<Props> = (props: Props) => {

    const onSelectRegion = (region: PlaystationApi.types.PlaystationRegion) => {
        props.clearGamesStore();
        props.selectRegion(region);
    };

    const renderRegion = (region: PlaystationApi.types.PlaystationRegion) => {
        let styledName;
        if (!props.current || props.current.name !== region.name) {
            styledName = region.name;
        } else {
            styledName = <b>{region.name}</b>;
        }

        return (
            <Dropdown.Item
                key={"dropdown-region-" + region.name}
                onClick={() => {
                    onSelectRegion(region);
                }}
            >
                {styledName}
            </Dropdown.Item>
        );
    };

    const regions = props.regions.map((region) => renderRegion(region));

    return (
        <Dropdown>
            <Dropdown.Toggle
                id="language-menu"
                size="sm"
                style={{
                    marginRight: "0.25rem",
                    border: 0,
                    color: "var(--text-primary)",
                    backgroundColor: "transparent",
                    fontSize: "0.8rem",
                }}
            >
                <FontAwesomeIcon icon={faLanguage} size="2x"/>
            </Dropdown.Toggle>

            <Dropdown.Menu>{regions}</Dropdown.Menu>
        </Dropdown>
    );
};

const mapStateToProps = (state: ReduxStoreState) =>
    ({ current: state.region.current, regions: state.region.regions } as RegionState);

export default connect(mapStateToProps, { selectRegion: selectRegion, clearGamesStore: clearGamesStore })(LanguageMenu);
