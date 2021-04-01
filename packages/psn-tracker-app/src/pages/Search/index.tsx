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
import SearchComponent from "../../components/Search";

interface Props extends PropsFromRedux, RouteComponentProps, React.HTMLProps<any> {}

const Search: React.FC<Props> = ({ store, history }: Props) => {
    React.useEffect(() => {
        if (!store) {
            history.push("/");
        }
    }, []);

    if (!store || !store.previews) {
        return <></>;
    }

    return (
        <>
            <Header isLanguageEnabled={true} />

            <SearchComponent />

            <PreviewsGrid games={store.previews} hasMoreItems={() => false} loadNextPage={(nextPage: number) => {}} />

            <Footer />
        </>
    );
};

const mapStateToProps = (state: ReduxStoreState) => ({
    store: state.store,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default withRouter(connector(Search));
