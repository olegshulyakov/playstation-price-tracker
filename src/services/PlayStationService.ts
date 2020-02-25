import { PlaystationLink, PlaystationObject } from "playstation";

const SORT_FIELD = Object.freeze({ RELEASE_DATE: "release_date", TIMESTAMP: "timestamp" });
const SORT_DIRECTION = Object.freeze({ ASC: "asc", DESC: "desc" });

export default class PlayStationService {
    private readonly baseUrl = "https://store.playstation.com/store/api/chihiro/00_09_000";
    private readonly rootCusa = "STORE-MSF75508-FULLGAMES";
    private language: string;
    private country: string;
    private storeInfo: any;

    constructor(language: string, country: string) {
        this.language = language;
        this.country = country;
    }

    async getGeoInfo() {
        console.debug(`Quering geo info`);
        const response = await fetch(`${this.baseUrl}//geo`);
        return response;
    }

    async query(cusa: string, size: number = 1, start: number = 0) {
        console.debug(`Quering cusa=${cusa}, start=${start}, size=${size}`);
        const response = await fetch(
            `${this.baseUrl}/container/${this.language}/${this.country}/999/${cusa}?size=${size}&start=${start}&sort_default=${SORT_FIELD.TIMESTAMP}&sort_default_direction=${SORT_DIRECTION.DESC}`,
        );
        return response;
    }

    async getGameInfo(cusa: string): Promise<PlaystationObject> {
        console.debug(`Loading game info ${cusa}`);
        const response = await this.query(cusa);
        const json = await response.json();
        return json;
    }

    async getStoreInfo(): Promise<PlaystationObject> {
        console.debug("Loading games count");
        const response = await this.query(this.rootCusa, 0);
        const json = await response.json();
        //console.debug(`Count response: ${JSON.stringify(json)}`);
        this.storeInfo = json;
        return this.storeInfo;
    }

    async getGamesList(): Promise<PlaystationLink[]> {
        console.debug("Loading games");
        const response = await this.query(this.rootCusa, 10);
        const json = await response.json();
        //console.debug(`Game list response: ${JSON.stringify(json)}`);
        return json.links;
    }

    getGameImageLink(cusa: string, width: number = 240, height: number = 240): string {
        return `${this.baseUrl}/titlecontainer/${this.country}/${this.language}/999/${cusa}/image?w=${width}&h=${height}`;
    }

    getStoreGameLink(cusa: string): string {
        console.debug(`Generating game link ${cusa}`);
        return `https://store.playstation.com/${this.language}-${this.country}/product/${cusa}`;
    }
}
