import { Request, Response, NextFunction } from 'express';
import { ValidationResult } from 'joi';
import { User } from '../entities/User';
import { ValidationError } from '../errors/ValidationError';
import { loginUserSchema, registerUserSchema } from '../validation/Auth';
import { AuthService } from '../services/AuthService';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';

class AuthController {
    private readonly service: AuthService = new AuthService();

    constructor() {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.protect = this.protect.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.logout = this.logout.bind(this);
    }

    public async register(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const validated: ValidationResult = registerUserSchema.validate(
            req.body,
            {
                stripUnknown: true,
            },
        );

        if (validated.error) {
            return next(new ValidationError(validated.error));
        }

        return this.service
            .register(validated.value, req, res)
            .then((user: User) => {
                return res.json(user);
            })
            .catch((err: Error) => next(err));
    }

    public async login(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const validated: ValidationResult = loginUserSchema.validate(req.body, {
            stripUnknown: true,
        });

        if (validated.error) {
            return next(new ValidationError(validated.error));
        }

        return this.service
            .login(validated.value.username, validated.value.password, req, res)
            .then((user: User) => {
                return res.json(user);
            })
            .catch((err: Error) => next(err));
    }

    public protect(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction,
    ): void {
        this.service.protect(req, res, next).catch((err: Error) => next(err));
    }

    public async isAuthenticated(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        this.service
            .isAuthenticated(req, res)
            .then((user: User) => {
                return res.json(user);
            })
            .catch((err: Error) => next(err));
    }

    public async logout(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        try {
            res.clearCookie('token');
            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();
