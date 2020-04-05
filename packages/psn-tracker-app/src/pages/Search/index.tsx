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
import { Col, Container, Form, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as PlaystationApi from "playstation-api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PreviewsGrid from "../../components/PreviewsGrid";
import { searchGames } from "../../actions/gameActions";

interface SearchProps extends RouteComponentProps {
    region: PlaystationApi.types.PlaystationRegion;
    store: PlaystationStore;
    searchGames: Function;
}

class Search extends React.Component<SearchProps> {
    componentDidMount(): void {
        if (!this.props.store) {
            this.props.history.push("/");
        }
    }

    hasMoreItems() {
        return false;
    }

    loadNextPage(nextPage: number) {}

    handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target || !this.props.region) return;
        const query = e.target.value;
        if (!query || query.length <= 3 || query[query.length - 1] === " ") return;

        this.props.searchGames(this.props.region, query);
    }

    render() {
        if (!this.props.store || !this.props.store.search) {
            return <></>;
        }

        return (
            <>
                <Header isLanguageEnabled={true} />
                <Container fluid>
                    <Form>
                        <Col xs={4} className="mx-auto pt-2 pb-2">
                        <FormControl
                            key="search-input"
                            type="text"
                            placeholder="Start typing..."
                            onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                        />
                        </Col>
                    </Form>

                    <PreviewsGrid
                        region={this.props.region}
                        games={this.props.store.search}
                        hasMoreItems={this.hasMoreItems}
                        loadNextPage={this.loadNextPage}
                    />
                </Container>
                <Footer />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxStoreState) =>
    ({
        region: state.region.current,
        store: state.store,
    } as SearchProps);
const mapDispatchToProps = { searchGames: searchGames };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
