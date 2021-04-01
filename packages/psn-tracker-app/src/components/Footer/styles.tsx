import styled from "styled-components";

export const FooterContainer = styled.footer`
    margin-top: auto;
    width: 100%;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    justify-content: center;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    font-size: 0.8rem;

    @media only screen and (max-width: 600px) {
        display: none;
    }
`;
