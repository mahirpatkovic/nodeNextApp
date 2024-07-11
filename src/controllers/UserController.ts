import { UserService } from '../services/UserService';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';
import { IPagination } from '../interfaces/models/Pagination';

class UserController {
    private readonly service: UserService = new UserService();

    constructor() {
        this.getUser = this.getUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
    }

    public async getUser(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        return this.service
            .getUser(req.params.id)
            .then((user: User) => {
                return res.json(user);
            })
            .catch((err: Error) => next(err));
    }

    public async getUsers(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const page: number = req.query.page
            ? parseInt(req.query.page.toString())
            : 1;
        const pageSize: number = req.query.pageSize
            ? parseInt(req.query.pageSize.toString())
            : 10;

        return this.service
            .getUsers(page, pageSize)
            .then((result: IPagination<User>) => {
                return res.json(result);
            })
            .catch((err: Error) => next(err));
    }

    public async searchUsers(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        return this.service
            .searchUsers(req.query.searchQuery.toString())
            .then((result: User[]) => {
                return res.json(result);
            })
            .catch((err: Error) => next(err));
    }
}

export default new UserController();
