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
import { Card } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as PlaystationApi from "playstation-api";
import {
    DiscountContainer,
    DiscountPriceContainer,
    GamePreviewFooterContainer,
    GamePreviewPlatformContainer,
    GamePreviewPlatformName,
    Price,
    PriceWithoutDiscount,
    SaleDiscount,
} from "./styles";

export interface Props extends PropsFromRedux, RouteComponentProps, React.HTMLProps<any> {
    game: PlaystationItemPreview;
}

const GamePreview: React.FC<Props> = ({ region, game }: Props) => {
    /*const handleGameClick = (game: PlaystationItemPreview) => {
        props.history.push({ pathname: "/game/" + game.id, state: game.url });
    };*/

    const redirectToPsStore = (event: any) => {
        event.preventDefault();
        window.open(PlaystationApi.helpers.getStoreGameLink(region, game.id), "_blank");
    };

    return (
        <Card key={game.id} className="preview-card">
            <Card.Img
                variant="top"
                className="btn p-0"
                src={game.image}
                loading="lazy"
                alt={game.name}
                title={game.name}
                placeholder={game.name}
                onClick={redirectToPsStore}
            />
            <Card.Body className="p-2 btn" onClick={redirectToPsStore}>
                <Card.Title className="m-0 text-left">
                    <small>{game.name}</small>
                </Card.Title>
            </Card.Body>
            <Card.Footer className="text-left p-2">
                <GamePreviewFooterContainer onClick={redirectToPsStore}>
                    <GamePreviewPlatformContainer>
                        {game.playable_platform.map((platform) => (
                            <GamePreviewPlatformName key={platform}>{platform}</GamePreviewPlatformName>
                        ))}
                    </GamePreviewPlatformContainer>

                    {!game.sale_discount && <Price>{game.initial_price}</Price>}

                    {game.sale_discount && (
                        <DiscountContainer>
                            <SaleDiscount>{game.sale_discount}%</SaleDiscount>

                            <DiscountPriceContainer>
                                <PriceWithoutDiscount>
                                    <Price>{game.initial_price}</Price>
                                </PriceWithoutDiscount>

                                <Price>{game.sale_price}</Price>
                            </DiscountPriceContainer>
                        </DiscountContainer>
                    )}
                </GamePreviewFooterContainer>
            </Card.Footer>
        </Card>
    );
};

const mapStateToProps = (state: ReduxStoreState) => ({
    region: state.region.current,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default withRouter(connector(GamePreview));
