import axios, { Axios } from 'axios';
import Newspaper from "./newspaper";
import Article from './article';
import cheerio from 'cheerio';

export default class NewspaperScrapper {
    private http: Axios;

    constructor() {
        this.http = axios.create();
    }

    public async getArticlesForNewspapers(newspapers: Newspaper[]): Promise<Article[]> {
        const articles: Article[] = new Array<Article>();

        for (const newspaper of newspapers) {
            const pageResponse = await this.http.get(newspaper.url);

            if (pageResponse.status !== 200) {
                console.error(`Error fetching articles: ${pageResponse.data}`);
                continue;
            }

            const html = pageResponse.data;
            const $ = cheerio.load(html);

            $('a:contains("Climate")').each((i: number, element: cheerio.Element) => {
                const title = $(element).text();
                const url = $(element).attr('href');
                const article = new Article(title, url, newspaper.name);
                articles.push(article);
            });
        }

        return articles;
    }
}