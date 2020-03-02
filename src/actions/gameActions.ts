import PlayStationService from "../services/PlayStationService";
import { FETCH_GAMES_COUNT, FETCH_GAMES_LIST } from "./types";

export const fetchGamesStore = (language: string, country: string) => (dispatch: Function) => {
    const service = new PlayStationService(language, country);
    service
        .getStoreInfo()
        .then((storeInfo) => {
            dispatch({ type: FETCH_GAMES_COUNT, count: storeInfo.total_results });
        })
        .then(() => {
            service.getGamesList().then((links) => {
                dispatch({ type: FETCH_GAMES_LIST, games: links });
            });
        });
};
