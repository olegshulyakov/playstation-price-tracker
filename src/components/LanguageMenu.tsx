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
import styled from "styled-components";
import { MenuItem, Menu } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { PlaystationRegion } from "playstation";
import { selectRegion } from "../actions/regionActions";
import { clearGamesStore } from "../actions/gameActions";

const LanguageMenuButton = styled.button`
    margin-right: 0.25rem;
    border: 0;
    color: var(--text-secondary);
    background-color: transparent;
    font-size: 0.8rem;
`;

interface LanguageMenuProps extends RegionState {
    selectRegion: Function;
    clearGamesStore: Function;
}

interface LanguageMenuState {
    anchorEl: null | HTMLElement;
}

class LanguageMenu extends React.Component<LanguageMenuProps, LanguageMenuState> {
    constructor(props: LanguageMenuProps) {
        super(props);
        this.state = { anchorEl: null };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderRegion = this.renderRegion.bind(this);
        this.onSelectRegion = this.onSelectRegion.bind(this);
    }

    onSelectRegion(region: PlaystationRegion) {
        this.props.clearGamesStore();
        this.props.selectRegion(region);
    }

    handleClick(event: React.MouseEvent<HTMLElement>) {
        this.setState({
            anchorEl: event.currentTarget,
        });
    }

    handleClose() {
        this.setState({
            anchorEl: null,
        });
    }

    renderRegion(region: PlaystationRegion) {
        const styledName = this.props.current && this.props.current === region ? <b>{region.name}</b> : region.name;
        return (
            <MenuItem
                key={"dropdown-region-" + region.name}
                onClick={() => {
                    this.onSelectRegion(region);
                }}
            >
                {styledName}
            </MenuItem>
        );
    }

    render() {
        const regions = this.props.regions.map((region) => this.renderRegion(region));

        return (
            <>
                <LanguageMenuButton aria-controls="language-menu" aria-haspopup="true" onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faLanguage} size="2x" />
                </LanguageMenuButton>
                <Menu
                    id="language-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    {regions}
                </Menu>
            </>
        );
    }
}

const mapStateToProps = (state: ReduxStoreState) =>
    ({ current: state.region.current, regions: state.region.regions } as RegionState);

export default connect(mapStateToProps, { selectRegion: selectRegion, clearGamesStore: clearGamesStore })(LanguageMenu);
