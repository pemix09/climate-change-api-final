import { NextFunction, Router, Request, Response } from 'express';
import NewsController from '../controllers/newsController';

export default class Routing {
    private router: Router;
    private newsController: NewsController;

    constructor() {
        this.router = Router();
        this.newsController = new NewsController();
        this.createRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private createRoutes(): void {
        this.router.get('/', function (req: Request, res: Response, next: NextFunction) {
            res.json({ message: 'Welcome to my climate change API!' });
            res.end();
        });
        
        this.router.get('/news', async (req: Request, res: Response, next: NextFunction) => {
            const articles = await this.newsController.getAllArticles();
            res.json(articles);
            res.end();
        });
        
        this.router.get('/news/:newspaper', async (req: Request, res: Response, next: NextFunction) => {
            const articles = await this.newsController.getArticlesForNewspaper(req.params.newspaper);
            res.json(articles);
        });
    }
}