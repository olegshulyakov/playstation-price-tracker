import React, { ChangeEvent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Col, Form, FormControl } from "react-bootstrap";
import { searchGames } from "../../actions/gameActions";

interface Props extends PropsFromRedux, React.HTMLProps<any> { }

const Search: React.FC<Props> = ( { region, searchGames }: Props ) => {
    if ( !region ) return <></>;

    const handleInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        if ( !e.target || !region ) return;
        const query = e.target.value;
        if ( !query || query.length <= 3 || query[query.length - 1] === " " ) return;

        searchGames( region, query );
    };

    return (
        <Form>
            <Col xs={4} className="mx-auto pt-2 pb-2">
                <FormControl
                    key="search-input"
                    type="text"
                    placeholder="Start typing..."
                    onChange={( e: ChangeEvent<HTMLInputElement> ) => handleInputChange( e )}
                />
            </Col>
        </Form>
    )
}

const mapStateToProps = ( state: ReduxStoreState ) => ( {
    region: state.region.current
} );
const mapDispatchToProps = { searchGames: searchGames };
const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector( Search );