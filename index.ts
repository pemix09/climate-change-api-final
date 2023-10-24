import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { Cheerio } from 'cheerio';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



