import Newspaper from "../model/newspaper";
import NewspaperScrapper from "../services/newspaperScrapper";

export default class NewsController {
    private scrapper: NewspaperScrapper;
    private newspapers: Newspaper[] = [
        new Newspaper('The Guardian', 'https://www.theguardian.com/environment/climate-crisis'),
        new Newspaper('The times', 'https://www.thetimes.co.uk/environment/climate-change'),
        new Newspaper('The Telegraph', 'https://www.telegraph.co.uk/climate-change/'),
    ]

    constructor() {
        this.scrapper = new NewspaperScrapper();
    }

    public getAllArticles() {
        return this.scrapper.getArticlesForNewspapers(this.newspapers);
    }

    public getArticlesForNewspaper(newspaperName: string) {
        let newspaper: Newspaper | undefined = this.newspapers.find(newspaper => newspaper.name === newspaperName);

        if (!newspaper) {
            throw new Error(`Newspaper with name: ${newspaperName} not found`);
        }

        return this.scrapper.getArticlesForNewspapers([newspaper]);
    }
}