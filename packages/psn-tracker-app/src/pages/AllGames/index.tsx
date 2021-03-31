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
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PreviewsGrid from "../../components/PreviewsGrid";
import { fetchGamePreviewsList } from "../../actions/gameActions";

interface Props extends PropsFromRedux, RouteComponentProps, React.HTMLProps<any> {
    filter?: ( item: PreviewGamesMapItem ) => boolean;
};

const AllGames: React.FC<Props> = ( { region, store, fetchGames, filter, history }: Props ) => {
    React.useEffect( () => {
        if ( !region || !store || !store.info || !store.info.total_results ) {
            history.push( "/" );
        }
    }, [] );

    const hasMoreItems = () => {
        return !(
            !store.info ||
            !store.previews ||
            store.previews.length >= store.info.total_results
        );
    };

    const loadNextPage = ( nextPage: number ) => {
        if ( !store.info || !store.previews ) {
            return;
        }
        fetchGames( region, store.info.total_results, store.previews.length );
    };

    if ( !store || !store.previews ) {
        return <></>;
    }

    const list = filter ? store.previews.slice().filter( ( item ) => filter( item ) ) : store.previews.slice();
    return (
        <>
            <Header isLanguageEnabled={true} />

            <PreviewsGrid
                games={list}
                hasMoreItems={hasMoreItems}
                loadNextPage={loadNextPage}
            />

            <Footer />
        </>
    );
};

const mapStateToProps = ( state: ReduxStoreState ) => (
    {
        region: state.region.current,
        store: state.store,
    }
);
const mapDispatchToProps = { fetchGames: fetchGamePreviewsList };

const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter( connector( AllGames ) );
