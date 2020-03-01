import { PlaystationLink, PlaystationObject } from "playstation";

export default class PlayStationGameService {
    private language: string;
    private country: string;

    constructor(language: string, country: string) {
        console.debug(`Creating PlayStationGameService for [${language}, ${country}]`);
        this.language = language;
        this.country = country;
    }

    getStoreGameLink(cusa: string): string {
        console.debug(`Generating game link ${cusa}`);
        return `https://store.playstation.com/${this.language}-${this.country}/product/${cusa}`;
    }

    getInitialPrice(game: PlaystationLink | PlaystationObject): string | undefined {
        if (game.default_sku) {
            return game.default_sku.display_price;
        }
        return undefined;
    }

    isSale(game: PlaystationLink | PlaystationObject) {
        return game.default_sku?.rewards && game.default_sku?.rewards.length > 0;
    }

    getSaleDetails(game: PlaystationLink | PlaystationObject) {
        if (game.default_sku?.rewards && game.default_sku?.rewards.length > 0) {
            return game.default_sku?.rewards[0];
        }
        return undefined;
    }

    getCurrentPrice(game: PlaystationLink | PlaystationObject): string | undefined {
        const saleDetails = this.getSaleDetails(game);
        if (saleDetails && saleDetails.display_price) {
            return saleDetails.display_price;
        }
        return this.getInitialPrice(game);
    }

    getPsPlusPrice(game: PlaystationLink | PlaystationObject) {
        const saleDetails = this.getSaleDetails(game);
        if (saleDetails && saleDetails.bonus_display_price) {
            return saleDetails.bonus_display_price;
        }
        return undefined;
    }

    getPreviewImage(game: PlaystationLink | PlaystationObject) {
        return game.images[0].url;
    }
}
