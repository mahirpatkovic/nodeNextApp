import { Router } from 'express';
import PostController from '../controllers/PostController';
import AuthController from '../controllers/AuthController';

export class PostRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.routes();
    }

    public routes(): void {
        this.router.get('/', PostController.getAllPosts);
        this.router.use(AuthController.protect);
        this.router.post('/', PostController.createPost);
    }

    public getRouter(): Router {
        return this.router;
    }
}
