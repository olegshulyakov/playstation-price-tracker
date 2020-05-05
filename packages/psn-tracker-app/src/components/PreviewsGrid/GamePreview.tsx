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

export interface GamePreviewProps extends RouteComponentProps {
    region: PlaystationApi.types.PlaystationRegion;
    game: PlaystationItemPreview;
}

class GamePreview extends React.Component<GamePreviewProps> {
    constructor(props: GamePreviewProps) {
        super(props);
        this.handleGameClick = this.handleGameClick.bind(this);
        this.redirectToPsStore = this.redirectToPsStore.bind(this);
    }

    handleGameClick(game: PlaystationItemPreview) {
        this.props.history.push({ pathname: "/game/" + game.id, state: game.url });
    }

    redirectToPsStore(event: any) {
        event.preventDefault();
        window.open(PlaystationApi.helpers.getStoreGameLink(this.props.region, this.props.game.id), "_blank");
    }

    render() {
        let price = (
            <div onClick={this.redirectToPsStore}>
                <small>{this.props.game.initial_price}</small>
            </div>
        );
        if (this.props.game.sale_discount) {
            price = (
                <div onClick={this.redirectToPsStore}>
                    <small className="price-sale"> {this.props.game.sale_discount}% </small>{" "}
                    <s>
                        <small>{this.props.game.initial_price}</small>
                    </s>{" "}
                    <small>{this.props.game.sale_price}</small>
                </div>
            );
        }

        return (
            <Card className="preview-card">
                <Card.Img
                    variant="top"
                    className="btn p-0"
                    src={this.props.game.image}
                    loading="lazy"
                    alt={this.props.game.name}
                    title={this.props.game.name}
                    placeholder={this.props.game.name}
                    onClick={() => this.handleGameClick(this.props.game)}
                />
                <Card.Body className="p-2 btn" onClick={() => this.handleGameClick(this.props.game)}>
                    <Card.Title className="m-0 text-left">
                        <small>{this.props.game.name}</small>
                    </Card.Title>
                </Card.Body>
                <Card.Footer className="text-left p-2">{price}</Card.Footer>
            </Card>
        );
    }
}

export default withRouter(GamePreview);
