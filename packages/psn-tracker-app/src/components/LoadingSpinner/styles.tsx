import styled, { keyframes } from "styled-components";

export const LoadingScreen = styled.div`
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

export const LoadingLogo = styled.img`
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

export const LoadingProgressMessage = styled.div`
    align-self: center;
`;