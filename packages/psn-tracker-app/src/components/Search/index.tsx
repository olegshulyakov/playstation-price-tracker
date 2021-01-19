/*
 * Copyright (c) 2021. Oleg Shulyakov
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

import { RouteComponentProps, withRouter } from "react-router-dom";
import React, { ChangeEvent } from "react";
import * as PlaystationApi from "playstation-api";
import { Form, FormControl } from "react-bootstrap";
import { searchGames } from "../../actions/gameActions";
import { connect } from "react-redux";

interface Props extends RouteComponentProps, React.HTMLProps<any> {
    region: PlaystationApi.types.PlaystationRegion;
    searchGames: Function;
}

const Search: React.FC<Props> = (props: Props) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target || !props.region) return;
        const query = e.target.value;
        if (!query || query.length <= 3 || query[query.length - 1] === " ") return;

        props.searchGames(props.region, query);
    };

    return (
        <Form className={props.className} style={props.style}>
            <FormControl
                key="search-input"
                type="text"
                placeholder="Search"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            />
        </Form>
    );
};

const mapStateToProps = (state: ReduxStoreState) => ({
    region: state.region.current,
});
const mapDispatchToProps = { searchGames: searchGames };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
