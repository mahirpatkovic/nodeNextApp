import { Router } from 'express';
import ExportController from '../controllers/ExportController';

export class ExportRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.routes();
    }

    public routes(): void {
        this.router.get('/orders', ExportController.exportOrders);
    }

    public getRouter(): Router {
        return this.router;
    }
}
