import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import { NextFunction, Request, Response } from 'express';
import { ValidationResult } from 'joi';
import { ValidationError } from '../errors/ValidationError';
import { CommentService } from '../services/CommentService';
import { createCommentSchema } from '../validation/Comment';
import { Comment } from '../entities/Comment';
import { IPagination } from '../interfaces/models/Pagination';

class CommentController {
    private readonly service: CommentService = new CommentService();

    constructor() {
        this.createComment = this.createComment.bind(this);
        this.getAllPostComments = this.getAllPostComments.bind(this);
    }

    public async createComment(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const validated: ValidationResult = createCommentSchema.validate(
            req.body,
            {
                stripUnknown: true,
            },
        );

        if (validated.error) {
            return next(new ValidationError(validated.error));
        }

        return this.service
            .createComment(validated.value, req.user)
            .then((comment: Comment) => {
                return res.json(comment);
            })
            .catch((err: Error) => next(err));
    }

    public async getAllPostComments(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const page: number = req.query.page
            ? parseInt(req.query.page.toString())
            : 1;
        const pageSize: number = req.query.pageSize
            ? parseInt(req.query.pageSize.toString())
            : 5;

        return this.service
            .getAllPostComments(req.params.id, page, pageSize)
            .then((result: IPagination<Comment>) => {
                return res.json(result);
            })
            .catch((err: Error) => next(err));
    }
}

export default new CommentController();
