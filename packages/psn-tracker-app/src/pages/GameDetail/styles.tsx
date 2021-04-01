import styled from "styled-components";

export const AttributeTitle = styled.span`
    margin: 0;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
`;

export const AttributeValues = styled.p`
    margin: 0;
    letter-spacing: 0.01071em;
`;

export const GameDetailMediaCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

export const GameDetailMediaCardImage = styled.img`
    width: 240px;
    height: 240px;
    align-self: center;
    border-radius: 0.25rem;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const GameDetailMediaCardPrices = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0.5rem 0;
    align-items: center;
    font-size: 2rem;

    @media (min-width: 600px) {
        font-size: 1rem;
    }
`;

export const GameDetailTitle = styled.h3`
    margin: 0;
    font-size: 3rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.167;
    letter-spacing: 0;
    cursor: pointer;
`;

export const GameDetailDescription = styled.div`
    font-size: 0.9rem;
`;

export const SpaceElement = styled.div`
    height: 0.5rem;
`;

export const HiddenMobile = styled.div`
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

export const HiddenDesktop = styled.div`
    @media screen and (min-width: 600px) {
        display: none;
    }
`;
