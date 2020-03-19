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
import { selectRegion } from "../actions/regionActions";
import { clearGamesStore } from "../actions/gameActions";
import { PlaystationRegion } from "../services/Playstation/types";

const SelectRegionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2.5rem 1rem 0.5rem;
`;

const SelectRegionGrid = styled.div`
    min-height: 0px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16.875rem, 0.45fr));
    grid-auto-rows: minmax(0px, 70px);
    gap: 0.5rem;
    justify-content: center;

    @media screen and (min-width: 600px) {
        grid-template-columns: repeat(auto-fit, 16.875rem);
        gap: 0.75rem;
    }
`;

const SelectRegionCard = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 0.25rem;
    background-color: var(--br-card);
    border: 0;
    cursor: pointer;
    margin: 0;
    box-shadow: var(--box-shadow-card);
    overflow: hidden;
`;

const SelectRegionHeader = styled.h1`
    text-align: center;
`;

const SelectRegionName = styled.p`
    text-align: center;
`;

export interface SelectRegionProps extends RegionState {
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
            <SelectRegionCard
                key={"region-" + region.name}
                className="SelectRegion-card"
                onClick={() => {
                    this.props.clearGamesStore();
                    this.props.selectRegion(region);
                }}
            >
                <SelectRegionName>{region.name}</SelectRegionName>
            </SelectRegionCard>
        );
    }

    render() {
        const regions = this.props.regions.map((region) => this.renderRegion(region));
        return (
            <SelectRegionContainer>
                <SelectRegionHeader>Please select your country / region</SelectRegionHeader>
                <SelectRegionGrid>{regions}</SelectRegionGrid>
            </SelectRegionContainer>
        );
    }
}

const mapStateToProps = (state: ReduxStoreState) =>
    ({ regions: state.region.regions, current: state.region.current } as RegionState);

export default connect(mapStateToProps, {
    selectRegion: selectRegion,
    clearGamesStore: clearGamesStore,
})(SelectRegion);
