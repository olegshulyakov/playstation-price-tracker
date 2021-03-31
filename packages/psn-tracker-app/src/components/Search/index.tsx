import React, { ChangeEvent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Col, Form, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { clearGamesStore, searchGames } from "../../actions/gameActions";

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

    return (
        <Form>
            <Col xs={4} className="mx-auto pt-2 pb-2">
                <FormControl
                    key="search-input"
                    type="text"
                    placeholder="Start typing..."
                    value={searchString}
                    onChange={( e: ChangeEvent<HTMLInputElement> ) => handleInputChange( e )}
                />
                <FontAwesomeIcon
                    style={{
                        position: "absolute",
                        right: "24px",
                        top: "19px"
                    }}
                    icon={faTimes}
                    size="1x"
                    onClick={() => { setSearchString( "" ); clearGamesStore() }}
                />
            </Col>
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