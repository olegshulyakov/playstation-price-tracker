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

import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { searchGames } from "../actions/gameActions";
import { connect } from "react-redux";
import * as PlaystationApi from "playstation-api";
import { Dropdown } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

const SearchInput = styled.input`
    flex-grow: 1;
    height: 1.5rem;
    margin: 0 0.5rem 0 0.5rem;
    padding: 0.25rem;
    border: 0;
    color: var(--text-secondary);
    background-color: transparent;
`;

const SearchImage = styled.img`
    margin-right: 0.25rem;
    min-height: var(--img-search-small);
    min-width: var(--img-search-small);
    max-height: var(--img-search-small);
    max-width: var(--img-search-small);

    @media (min-width: 600px) {
        min-height: var(--img-search);
        min-width: var(--img-search);
        max-height: var(--img-search);
        max-width: var(--img-search);
    }
`;

interface SearchProps extends RouteComponentProps {
    region?: PlaystationApi.types.PlaystationRegion;
    games?: PlaystationItemPreview[];
    search: Function;
}

class Search extends React.Component<SearchProps> {
    constructor(props: SearchProps) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target || !this.props.region) return;
        const query = e.target.value;
        if (!query || query.length <= 3 || query[query.length - 1] === " ") return;

        this.props.search(this.props.region, query);
    }

    renderGame(item: PlaystationItemPreview) {
        return (
            <Dropdown.Item
                key={item.id}
                onClick={() => {
                    this.props.history.push({ pathname: "/game/" + item.id, state: item.url });
                }}
            >
                <SearchImage src={item.image} alt={item.name} title={item.name}/>
                {item.name}  {item.display_price}
            </Dropdown.Item>
        );
    }

    render() {
        const games = this.props.games ? this.props.games.slice().map((item) => this.renderGame(item)) : <></>;

        return (
            <Dropdown key="search">
                <Dropdown.Toggle id="search-input" key="search-toggle" style={{
                    border: 0,
                    backgroundColor: "transparent",
                }}>
                    <SearchInput key="search-input"
                                 type="text"
                                 placeholder="Search here..."
                                 onChange={e => this.handleInputChange(e)}/>
                </Dropdown.Toggle>

                <Dropdown.Menu key="search-menu">
                    {games}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

const mapStateToProps = (state: ReduxStoreState) => ({ region: state.region.current, games: state.store.search });
const mapDispatchToProps = { search: searchGames };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
