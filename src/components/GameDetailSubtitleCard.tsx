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
import { PlaystationObject } from "playstation";
import { Typography } from "@material-ui/core";

export default class GameDetailSubtitleCard extends React.Component<{ game: PlaystationObject }> {
    render() {
        if (
            !this.props.game.default_sku?.entitlements ||
            this.props.game.default_sku?.entitlements.length === 0 ||
            !this.props.game.default_sku?.entitlements[0].subtitle_language_codes ||
            this.props.game.default_sku?.entitlements[0].subtitle_language_codes.length === 0
        ) {
            return <></>;
        }

        return (
            <>
                <Typography variant="button">Subtitles</Typography>
                <Typography variant="body2">
                    {this.props.game.default_sku?.entitlements[0].subtitle_language_codes?.map((voice: string) => {
                        return voice.toUpperCase() + " ";
                    })}
                </Typography>
            </>
        );
    }
}