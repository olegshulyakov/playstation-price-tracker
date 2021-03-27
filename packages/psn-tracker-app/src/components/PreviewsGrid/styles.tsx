import styled from "styled-components";

export const StoreGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, var(--img-preview-side-small));
    grid-auto-rows: auto;
    gap: 1rem;
    justify-content: center;

    @media screen and (min-width: 600px) {
        grid-template-columns: repeat(auto-fit, var(--img-preview-side));
        grid-auto-rows: auto;
        gap: 0.5rem;
    }
`;