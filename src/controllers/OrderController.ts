import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import { NextFunction, Request, Response } from 'express';
import { ValidationResult } from 'joi';
import { createOrderSchema } from '../validation/Order';
import { ValidationError } from '../errors/ValidationError';
import { Order } from '../entities/Order';
import { OrderService } from '../services/OrderService';
import { IPagination } from '../interfaces/models/Pagination';

class OrderController {
    private readonly service: OrderService = new OrderService();

    constructor() {
        this.createOrder = this.createOrder.bind(this);
        this.getOrderWithFilter = this.getOrderWithFilter.bind(this);
        this.getOrder = this.getOrder.bind(this);
    }

    public async createOrder(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const validated: ValidationResult = createOrderSchema.validate(
            req.body,
            {
                stripUnknown: true,
            },
        );

        if (validated.error) {
            return next(new ValidationError(validated.error));
        }

        return this.service
            .createOrder(validated.value, req.user)
            .then((order: Order) => {
                return res.json(order);
            })
            .catch((err: Error) => next(err));
    }

    public async getOrder(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        return this.service
            .getOrder(req.params.id)
            .then((order: Order) => {
                return res.json(order);
            })
            .catch((err: Error) => next(err));
    }

    public async getOrderWithFilter(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        return this.service
            .getOrderWithFilter(req.query)
            .then((data: IPagination<Order>) => {
                return res.json(data);
            })
            .catch((err: Error) => next(err));
    }
}

export default new OrderController();
