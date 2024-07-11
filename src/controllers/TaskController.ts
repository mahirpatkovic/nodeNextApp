import { TaskService } from '../services/TaskService';
import { Request, Response, NextFunction } from 'express';
import { ValidationResult } from 'joi';
import { createTaskSchema } from '../validation/Task';
import { ValidationError } from '../errors/ValidationError';
import { Task } from '../entities/Task';

class TaskController {
    private readonly service: TaskService = new TaskService();
    constructor() {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.getAllUserTasks = this.getAllUserTasks.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async create(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const validated: ValidationResult = createTaskSchema.validate(
            req.body,
            {
                stripUnknown: true,
            },
        );

        if (validated.error) {
            return next(new ValidationError(validated.error));
        }

        return this.service
            .create(req.body)
            .then((task: Task) => {
                return res.json(task);
            })
            .catch((err: Error) => next(err));
    }

    public async update(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const validated: ValidationResult = createTaskSchema.validate(
            req.body,
            {
                stripUnknown: true,
            },
        );

        if (validated.error) {
            return next(new ValidationError(validated.error));
        }

        return this.service
            .update(req.params.id, req.body)
            .then((task: Task) => {
                return res.json(task);
            })
            .catch((err: Error) => next(err));
    }

    public async getAllUserTasks(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const { startDate, endDate } = req.query;

        return this.service
            .getAllUserTasks(
                req.params.id,
                new Date(startDate.toString()),
                new Date(endDate.toString()),
            )
            .then((tasks: Task[]) => {
                return res.json(tasks);
            })
            .catch((err: Error) => next(err));
    }

    public async delete(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        return this.service
            .delete(req.params.id)
            .then(() => {
                return res.sendStatus(200);
            })
            .catch((err: Error) => next(err));
    }
}

export default new TaskController();
