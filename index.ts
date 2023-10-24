import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Article from './article';
import Newspaper from './newspaper';
import NewspaperScrapper from './newspaperScrapper';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;
const newspapers = [
    new Newspaper('The Guardian', 'https://www.theguardian.com/environment/climate-crisis'),
    new Newspaper('The times', 'https://www.thetimes.co.uk/environment/climate-change'),
    new Newspaper('The Telegraph', 'https://www.telegraph.co.uk/climate-change/'),
]
const scrapper: NewspaperScrapper = new NewspaperScrapper();
const articles: Article[] = [];

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to my climate change API!' });
});

app.get('/news', async (req: Request, res: Response) => {
    const articles = await scrapper.getArticlesForNewspapers(newspapers);
    res.json(articles);
});

app.get('/news/:newspaper', async (req: Request, res: Response) => {
    const articles = await scrapper.getArticlesForNewspapers(newspapers.filter(newspaper => newspaper.name === req.params.newspaper));
    res.json(articles);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



