import * as express from 'express';
import { AuthRouter } from './AuthRouter';
import { UserRouter } from './UserRouter';
import { PostRouter } from './PostRouter';
import { CommentRouter } from './CommentRouter';
import { OrderRouter } from './OrderRouter';
import { ExportRouter } from './ExportRouter';
import { TaskRouter } from './TaskRouter';

export default class Router {
    constructor(app: express.Application) {
        const router: express.Router = express.Router();
        app.use('/api/v1', router);
        this.getRoutes(router);
    }

    private getRoutes(router: express.Router): void {
        router.use('/auth', new AuthRouter().getRouter());
        router.use('/users', new UserRouter().getRouter());
        router.use('/posts', new PostRouter().getRouter());
        router.use('/comments', new CommentRouter().getRouter());
        router.use('/orders', new OrderRouter().getRouter());
        router.use('/export', new ExportRouter().getRouter());
        router.use('/tasks', new TaskRouter().getRouter());
    }
}
