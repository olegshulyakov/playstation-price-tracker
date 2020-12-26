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

    let price = (
        <div onClick={redirectToPsStore}>
            <small>{props.game.initial_price}</small>
        </div>
    );
    if (props.game.sale_discount) {
        price = (
            <div onClick={redirectToPsStore}>
                <small className="price-sale"> {props.game.sale_discount}% </small>{" "}
                <s>
                    <small>{props.game.initial_price}</small>
                </s>{" "}
                <small>{props.game.sale_price}</small>
            </div>
        );
    }

    const imageLink = props.game.image;

    return (
        <Card className="preview-card">
            <Card.Img
                variant="top"
                className="btn p-0"
                src={imageLink}
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
            <Card.Footer className="text-left p-2">{price}</Card.Footer>
        </Card>
    );
};

export default withRouter(GamePreview);
