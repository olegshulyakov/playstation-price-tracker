import styled from "styled-components";

export const SelectRegionGrid = styled.div`
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16.875rem, 0.45fr));
    grid-auto-rows: minmax(0px, 70px);
    gap: 0.5rem;
    justify-content: center;

    @media screen and (min-width: 600px) {
        grid-template-columns: repeat(auto-fit, 16.875rem);
        gap: 0.75rem;
    }
`;

export const SelectRegionCard = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 0.25rem;
    background-color: var(--br-card);
    border: 0;
    cursor: pointer;
    margin: 0;
    box-shadow: var(--box-shadow-card);
    overflow: hidden;
`;

export const SelectRegionHeader = styled.h1`
    text-align: center;
`;

export const SelectRegionName = styled.p`
    text-align: center;
`;