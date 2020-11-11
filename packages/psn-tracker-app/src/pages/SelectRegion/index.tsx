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
import styled from "styled-components";
import { selectRegion } from "../../actions/regionActions";
import { clearGamesStore } from "../../actions/gameActions";
import { getCountryCode } from "../../services/GeoLocation";
import * as PlaystationApi from "playstation-api";
import { Container } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { RouteComponentProps, withRouter } from "react-router-dom";

const SelectRegionGrid = styled.div`
    min-height: 0;
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

interface Props extends RegionState, RouteComponentProps, React.HTMLProps<any> {
    selectRegion: Function;
    clearGamesStore: Function;
}

const SelectRegion: React.FC<Props> = (props: Props) => {
    React.useEffect(() => {
        getCountryCode((country_code: string) => {
            for (const region of props.regions) {
                if (region.country.toLowerCase() !== country_code.toLowerCase()) continue;
                props.selectRegion(region);
            }
        });
    }, []);

    React.useEffect(() => {
        if (props.current) {
            props.history.push("/");
        }
    }, [props.current]);

    const renderRegion = (region: PlaystationApi.types.PlaystationRegion) => {
        return (
            <SelectRegionCard
                key={"region-" + region.name}
                className="SelectRegion-card"
                onClick={() => {
                    props.clearGamesStore();
                    props.selectRegion(region);
                }}
            >
                <SelectRegionName>{region.name}</SelectRegionName>
            </SelectRegionCard>
        );
    };

    const regions = props.regions.map((region) => renderRegion(region));
    return (
        <>
            <Header />
            <Container fluid>
                <SelectRegionHeader>Please select your country / region</SelectRegionHeader>
                <SelectRegionGrid>{regions}</SelectRegionGrid>
            </Container>
            <Footer />
        </>
    );
};

const mapStateToProps = (state: ReduxStoreState) =>
    ({ regions: state.region.regions, current: state.region.current } as RegionState);
const mapDispatchToProps = {
    selectRegion: selectRegion,
    clearGamesStore: clearGamesStore,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SelectRegion));
