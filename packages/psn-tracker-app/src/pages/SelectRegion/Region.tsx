import React from "react";
import { connect, ConnectedProps } from "react-redux";
import * as PlaystationApi from "playstation-api";
import { clearGamesStore } from "../../actions/gameActions";
import { selectRegion } from "../../actions/regionActions";
import { SelectRegionCard, SelectRegionName } from "./styles";

interface Props extends PropsFromRedux {
    region: PlaystationApi.types.PlaystationRegion;
}

const Region: React.FC<Props> = ( { region, selectRegion, clearGamesStore }: Props ) => {
    return (
        <SelectRegionCard
            key={"region-" + region.name}
            className="SelectRegion-card"
            onClick={() => {
                clearGamesStore();
                selectRegion( region );
            }}
        >
            <SelectRegionName>{region.name}</SelectRegionName>
        </SelectRegionCard>
    );
}

const mapDispatchToProps = {
    selectRegion,
    clearGamesStore,
};

const connector = connect( null, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector( Region );