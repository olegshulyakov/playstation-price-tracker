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
import { Card } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as PlaystationApi from "playstation-api";

export interface Props extends RouteComponentProps, React.HTMLProps<any> {
    region: PlaystationApi.types.PlaystationRegion;
    game: PlaystationItemPreview;
}

const GamePreview: React.FC<Props> = (props: Props) => {
    /*const handleGameClick = (game: PlaystationItemPreview) => {
        props.history.push({ pathname: "/game/" + game.id, state: game.url });
    };*/

    const redirectToPsStore = (event: any) => {
        event.preventDefault();
        window.open(PlaystationApi.helpers.getStoreGameLink(props.region, props.game.id), "_blank");
    };

    const priceEl = <small>{props.game.initial_price}</small>;
    const discountPriceEl = (
        <>
            <small className="price-sale" style={{margin: "auto 0.5rem auto 0"}}>
                {props.game.sale_discount}%
            </small>
            <s style={{margin: "auto 0.5rem auto 0"}}>{priceEl}</s>
            <small>{props.game.sale_price}</small>
        </>
    );

    return (
        <Card className="preview-card">
            <Card.Img
                variant="top"
                className="btn p-0"
                src={props.game.image}
                loading="lazy"
                alt={props.game.name}
                title={props.game.name}
                placeholder={props.game.name}
                onClick={redirectToPsStore}
            />
            <Card.Body className="p-2 btn" onClick={redirectToPsStore}>
                <Card.Title className="m-0 text-left">
                    <small>{props.game.name}</small>
                </Card.Title>
            </Card.Body>
            <Card.Footer className="text-left p-2">
                <div onClick={redirectToPsStore}>
                    {
                        props.game.sale_discount ? discountPriceEl : priceEl
                    }
                </div>
            </Card.Footer>
        </Card>
    );
};

export default withRouter(GamePreview);
