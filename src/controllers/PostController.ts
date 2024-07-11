import { NextFunction, Request, Response } from 'express';
import { PostService } from '../services/PostService';
import { Post } from '../entities/Post';
import { ValidationResult } from 'joi';
import { ValidationError } from '../errors/ValidationError';
import { createPostSchema } from '../validation/Post';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import { IPagination } from '../interfaces/models/Pagination';

class PostController {
    private readonly service: PostService = new PostService();

    constructor() {
        this.createPost = this.createPost.bind(this);
        this.getAllPosts = this.getAllPosts.bind(this);
    }

    public async createPost(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const validated: ValidationResult = createPostSchema.validate(
            req.body,
            {
                stripUnknown: true,
            },
        );

        if (validated.error) {
            return next(new ValidationError(validated.error));
        }

        return this.service
            .createPost(validated.value, req.user)
            .then((blog: Post) => {
                return res.json(blog);
            })
            .catch((err: Error) => next(err));
    }

    public async getAllPosts(
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
            .getAllPosts(page, pageSize)
            .then((result: IPagination<Post>) => {
                return res.json(result);
            })
            .catch((err: Error) => next(err));
    }
}

export default new PostController();
