import { FETCH_GAMES_COUNT, FETCH_GAMES_LIST } from "../actions/types";

const initialState: StoreState = {
    count: undefined,
    games: [],
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_GAMES_COUNT:
            return {
                ...state,
                count: action.count,
            } as StoreState;
        case FETCH_GAMES_LIST:
            return {
                ...state,
                games: action.games,
            } as StoreState;
        default:
            return state;
    }
};
