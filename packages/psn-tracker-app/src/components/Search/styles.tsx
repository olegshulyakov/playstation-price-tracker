import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchContainer = styled.div`
    margin: 0 auto;
    padding: 1.5rem 0;
    width: 100%;
    display: flex;
    flex-direction: row;

    @media screen and (min-width: 768px) {
        max-width: 50%;
    }

    @media screen and (min-width: 992px) {
        max-width: 33%;
    }
`;

export const SearchCrossIcon = styled( FontAwesomeIcon )`
    position: relative;
    right: 1.5em;
    top: 0.7em;
`;