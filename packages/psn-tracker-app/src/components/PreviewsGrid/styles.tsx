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

export const DiscountContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SaleDiscount = styled.span`
    background: var(--price-sale);
    color: var(--text-secondary);
    margin: auto 0.5rem auto 0;
    padding: 0.15rem;
`;

export const Price = styled.small``;

export const PriceWithoutDiscount = styled.s`
    font-size: 75%;
`;

export const DiscountPriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
`;

export const GamePreviewFooterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`;

export const GamePreviewPlatformContainer = styled.div`
    display: grid;
    grid-auto-flow: column;
    gap: 0 4px;
`;

export const GamePreviewPlatformName = styled.span`
    font-size: 75%;
    text-transform: uppercase;
`;
