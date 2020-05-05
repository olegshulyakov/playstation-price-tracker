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
import styled, { keyframes } from "styled-components";
import playstationClassicIcon from "../../assets/playstation-classic.svg";

const LoadingScreen = styled.div`
    position: absolute;
    top: 30%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
`;

const rotateLogoAnimation = keyframes`
    from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
        `;

const LoadingLogo = styled.img`
    align-self: center;
    height: 20vh;
    pointer-events: none;
    animation-name: ${rotateLogoAnimation};
    animation-duration: 0.9s;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
`;

const LoadingProgressMessage = styled.div`
    align-self: center;
`;

interface LoadingSpinnerProps {
    msg?: JSX.Element;
}

export default class LoadingSpinner extends React.Component<LoadingSpinnerProps> {
    render() {
        return (
            <LoadingScreen>
                <LoadingLogo src={playstationClassicIcon} alt="Loading" />
                <LoadingProgressMessage>{this.props.msg ? this.props.msg : ""}</LoadingProgressMessage>
            </LoadingScreen>
        );
    }
}
