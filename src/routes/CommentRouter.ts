import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import CommentController from '../controllers/CommentController';

export class CommentRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.routes();
    }

    public routes(): void {
        this.router.get('/post/:id', CommentController.getAllPostComments);

        this.router.use(AuthController.protect);
        this.router.post('/', CommentController.createComment);
    }

    public getRouter(): Router {
        return this.router;
    }
}
