/*
 * Copyright 2020 Oleg Shulyakov
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
import { Typography } from "@material-ui/core";

interface GameDetailAttributeCardProps {
    attribute: string;
    values: string[];
}

export default class GameDetailAttributeCard extends React.Component<GameDetailAttributeCardProps> {
    render() {
        if (!this.props.attribute || !this.props.values || this.props.values.length === 0) {
            return <></>;
        }

        return (
            <>
                <Typography variant="button">{this.props.attribute}</Typography>
                <Typography variant="body2">
                    {this.props.values?.map((value: string) => {
                        return value.toUpperCase() + " ";
                    })}
                </Typography>
            </>
        );
    }
}
