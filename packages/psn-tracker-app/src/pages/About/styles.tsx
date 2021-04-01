import styled from "styled-components";

export const AboutContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
`;

export const AboutContent = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 2.5rem;

    @media (min-width: 600px) {
        padding-top: 2.5rem;
        padding-bottom: 1rem;
    }
`;

export const ExternalLink = styled.a`
    color: #07c;
    text-decoration: none;
`;
