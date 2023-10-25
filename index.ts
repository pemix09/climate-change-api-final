import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Article from './model/article';
import Newspaper from './model/newspaper';
import NewspaperScrapper from './services/newspaperScrapper';
import Routing from './infrastructure/routing';

dotenv.config();

const app: Express = express();
const routing = new Routing();
const port: number = Number(process.env.PORT) || 3000;

app.use(routing.getRouter());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



