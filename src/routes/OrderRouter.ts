import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import AuthController from '../controllers/AuthController';

export class OrderRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.routes();
    }

    public routes(): void {
        this.router.get('/filter', OrderController.getOrderWithFilter);

        this.router.use(AuthController.protect);
        this.router.post('/', OrderController.createOrder);
        this.router.get('/:id', OrderController.getOrder);
    }

    public getRouter(): Router {
        return this.router;
    }
}
