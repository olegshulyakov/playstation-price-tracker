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

interface Props extends RouteComponentProps, React.HTMLProps<any> {
    region: PlaystationApi.types.PlaystationRegion;
    store: PlaystationStore;
    fetchGames: Function;
}

const AllGames: React.FC<Props> = (props: Props) => {
    React.useEffect(() => {
        if (!props.region || !props.store || !props.store.info || !props.store.info.total_results) {
            props.history.push("/");
        }
    }, []);

    const hasMoreItems = () => {
        return !(
            !props.store.info ||
            !props.store.previews ||
            props.store.previews.length >= props.store.info.total_results
        );
    };

    const loadNextPage = (nextPage: number) => {
        if (!props.store.info || !props.store.previews) {
            return;
        }
        props.fetchGames(props.region, props.store.info.total_results, props.store.previews.length);
    };

    if (!props.store || !props.store.previews) {
        return <></>;
    }

    return (
        <>
            <Header isLanguageEnabled={true} />
            <Container fluid>
                <PreviewsGrid
                    region={props.region}
                    games={props.store.previews}
                    hasMoreItems={hasMoreItems}
                    loadNextPage={loadNextPage}
                />
            </Container>
            <Footer />
        </>
    );
};

const mapStateToProps = (state: ReduxStoreState) => ({
    region: state.region.current,
    store: state.store,
});
const mapDispatchToProps = { fetchGames: fetchGamePreviewsList };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllGames));
