import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import TaskController from '../controllers/TaskController';

export class TaskRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.use(AuthController.protect);

        this.router.post('/', TaskController.create);
        this.router.get('/user/:id', TaskController.getAllUserTasks);
        this.router.patch('/:id', TaskController.update);
        this.router.delete('/:id', TaskController.delete);
    }

    public getRouter(): Router {
        return this.router;
    }
}
