import { Router } from 'express';
import AuthController from '../controllers/AuthController';

export class AuthRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.routes();
    }

    public routes(): void {
        this.router.post('/register', AuthController.register);
        this.router.post('/login', AuthController.login);

        this.router.use(AuthController.protect);

        this.router.post('/check', AuthController.isAuthenticated);
        this.router.get('/logout', AuthController.logout);
    }

    public getRouter(): Router {
        return this.router;
    }
}
