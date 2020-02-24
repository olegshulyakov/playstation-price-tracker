export default class PlayStationService {
    private readonly baseUrl = "https://store.playstation.com/store/api/chihiro/00_09_000/container";
    private readonly rootCusa = "STORE-MSF75508-FULLGAMES";
    private language: string;
    private country: string;

    constructor(language: string, country: string) {
        this.language = language;
        this.country = country;
    }

    async query(cusa: string, size: number = 1, start: number = 0) {
        const response = await fetch(
            `${this.baseUrl}/${this.language}/${this.country}/999/${cusa}?size=${size}&start=${start}`,
        );
        return response;
    }

    async getGameInfo(cusa: string, size: number = 1, start: number = 0) {
        console.debug(`Loading game info ${cusa}`);
        const response = await this.query(cusa);
        const json = await response.json();
        if (json.links && json.links.lenght < 1) {
            return null;
        }
        return json.links[0];
    }

    async getCount() {
        console.debug("Loading games count");
        const response = await this.query(this.rootCusa);
        const json = await response.json();
        console.debug(`Count response: ${JSON.stringify(json)}`);
        return json.total_results;
    }
}
