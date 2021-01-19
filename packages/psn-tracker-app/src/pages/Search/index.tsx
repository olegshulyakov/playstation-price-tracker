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
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as PlaystationApi from "playstation-api";
import {Header, Footer, PreviewsGrid, Search as SearchComponent} from "../../components";
import { searchGames } from "../../actions/gameActions";

interface Props extends RouteComponentProps, React.HTMLProps<any> {
    region: PlaystationApi.types.PlaystationRegion;
    store: PlaystationStore;
    searchGames: Function;
}

const Search: React.FC<Props> = (props: Props) => {
    React.useEffect(() => {
        if (!props.store) {
            props.history.push("/");
        }
    }, []);

    const hasMoreItems = () => {
        return false;
    };

    const loadNextPage = (nextPage: number) => {};

    if (!props.store || !props.store.search) {
        return <></>;
    }

    return (
        <>
            <Header isLanguageEnabled={true} />
            <Container fluid>
                <SearchComponent/>

                <PreviewsGrid
                    region={props.region}
                    games={props.store.search}
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
const mapDispatchToProps = { searchGames: searchGames };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
