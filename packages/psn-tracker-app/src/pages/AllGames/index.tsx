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
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as PlaystationApi from "playstation-api";
import { Container } from "react-bootstrap";
import { fetchGamePreviewsList } from "../../actions/gameActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PreviewsGrid from "../../components/PreviewsGrid";

interface AllGamesProps extends RouteComponentProps {
    region: PlaystationApi.types.PlaystationRegion;
    store: PlaystationStore;
    fetchGames: Function;
}

class AllGames extends React.Component<AllGamesProps> {
    constructor(props: AllGamesProps) {
        super(props);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.hasMoreItems = this.hasMoreItems.bind(this);
    }

    componentDidMount(): void {
        if (!this.props.store || !this.props.store.previews || this.props.store.previews.length === 0) {
            this.props.history.push("/");
        }
    }

    hasMoreItems() {
        return !(
            !this.props.store.info ||
            !this.props.store.previews ||
            this.props.store.previews.length >= this.props.store.info.total_results
        );
    }

    loadNextPage(nextPage: number) {
        if (!this.props.store.info || !this.props.store.previews) {
            return;
        }
        this.props.fetchGames(this.props.region, this.props.store.info.total_results, this.props.store.previews.length);
    }

    render() {
        if (!this.props.store || !this.props.store.previews) {
            return <></>;
        }

        return (
            <>
                <Header isLanguageEnabled={true} />
                <Container fluid>
                    <PreviewsGrid
                        region={this.props.region}
                        games={this.props.store.previews}
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
    } as AllGamesProps);
const mapDispatchToProps = { fetchGames: fetchGamePreviewsList };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllGames));
