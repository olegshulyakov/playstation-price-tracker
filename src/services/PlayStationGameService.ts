import { PlaystationLink, PlaystationObject, Reward, PlaystationItemPreview } from "playstation";

export const getStoreGameLink = (cusa: string, language: string, country: string): string => {
    console.debug(`Generating ps store link for [${cusa}]`);
    return `https://store.playstation.com/${language}-${country}/product/${cusa}`;
};

export const getGamePreview = (game: PlaystationLink): PlaystationItemPreview => {
    const image = game.images && game.images[0] ? game.images[0].url : "";
    return {
        id: game.id,
        name: game.name,
        image: image,
        url: game.url,
        display_price: getCurrentPrice(game),
        is_sale: isSale(game),
    } as PlaystationItemPreview;
};

export const getInitialPrice = (game: PlaystationLink | PlaystationObject): string | undefined => {
    if (game.default_sku) {
        return game.default_sku.display_price;
    }
    return undefined;
};

export const isSale = (game: PlaystationLink | PlaystationObject): boolean | undefined => {
    return game.default_sku?.rewards && game.default_sku?.rewards.length > 0;
};

export const getSaleDetails = (game: PlaystationLink | PlaystationObject): Reward | undefined => {
    if (game.default_sku?.rewards && game.default_sku?.rewards.length > 0) {
        return game.default_sku?.rewards[0];
    }
    return undefined;
};

export const getCurrentPrice = (game: PlaystationLink | PlaystationObject): string | undefined => {
    const saleDetails = getSaleDetails(game);
    if (saleDetails && saleDetails.display_price) {
        return saleDetails.display_price;
    }
    return getInitialPrice(game);
};

export const getPsPlusPrice = (game: PlaystationLink | PlaystationObject): string | undefined => {
    const saleDetails = getSaleDetails(game);
    if (saleDetails && saleDetails.bonus_display_price) {
        return saleDetails.bonus_display_price;
    }
    return undefined;
};

export const getPreviewImage = (game: PlaystationLink | PlaystationObject): string => {
    return game.images[0].url;
};
