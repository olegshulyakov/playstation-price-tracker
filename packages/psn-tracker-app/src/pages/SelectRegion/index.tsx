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
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { selectRegion } from "../../actions/regionActions";
import { getCountryCode } from "../../services/GeoLocation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Region from "./Region";
import { SelectRegionHeader, SelectRegionGrid } from "./styles";

interface Props extends PropsFromRedux, RouteComponentProps, React.HTMLProps<any> { }

const SelectRegion: React.FC<Props> = ( { regions, current, selectRegion, history }: Props ) => {
    React.useEffect( () => {
        getCountryCode( ( country_code: string ) => {
            for ( const region of regions ) {
                if ( region.country.toLowerCase() !== country_code.toLowerCase() ) continue;
                selectRegion( region );
            }
        } );
    }, [] );

    React.useEffect( () => {
        if ( current ) {
            history.push( "/" );
        }
    }, [current] );

    return (
        <>
            <Header />

            <SelectRegionHeader>Please select your country / region</SelectRegionHeader>

            <SelectRegionGrid>{regions.map( ( region ) => <Region region={region} /> )}</SelectRegionGrid>

            <Footer />
        </>
    );
};

const mapStateToProps = ( state: ReduxStoreState ) => (
    {
        regions: state.region.regions,
        current: state.region.current
    }
);
const mapDispatchToProps = {
    selectRegion
};

const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter( connector( SelectRegion ) );
