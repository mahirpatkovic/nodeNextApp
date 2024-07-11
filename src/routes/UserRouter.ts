import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

export class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.routes();
    }

    public routes(): void {
        this.router.use(AuthController.protect);

        this.router.get('/', UserController.getUsers);
        this.router.get('/search', UserController.searchUsers);
        this.router.get('/:id', UserController.getUser);
    }

    public getRouter(): Router {
        return this.router;
    }
}
