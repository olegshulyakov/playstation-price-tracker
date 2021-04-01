import React, { ChangeEvent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Form, FormControl } from "react-bootstrap";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { clearGamesStore, searchGames } from "../../actions/gameActions";
import { SearchContainer, SearchCrossIcon } from "./styles";

interface Props extends PropsFromRedux, React.HTMLProps<any> { }

const Search: React.FC<Props> = ( { region, clearGamesStore, searchGames }: Props ) => {
    const [searchString, setSearchString] = React.useState( "" );

    if ( !region ) return <></>;

    const handleInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        if ( !e.target || !region ) return;
        const query = e.target.value;
        setSearchString( query );

        if ( !query || query.length <= 3 || query[query.length - 1] === " " ) return;

        clearGamesStore();
        searchGames( region, query );
    };

    const handleClearSearch = () => {
        setSearchString( "" );
        clearGamesStore();
    };

    return (
        <Form>
            <SearchContainer>
                <FormControl
                    key="search-input"
                    type="text"
                    placeholder="Start typing..."
                    value={searchString}
                    onChange={( e: ChangeEvent<HTMLInputElement> ) => handleInputChange( e )}
                />

                <SearchCrossIcon
                    icon={faTimes}
                    size="1x"
                    onClick={handleClearSearch}
                />
            </SearchContainer>
        </Form>
    )
}

const mapStateToProps = ( state: ReduxStoreState ) => ( {
    region: state.region.current
} );
const mapDispatchToProps = { searchGames, clearGamesStore };
const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector( Search );