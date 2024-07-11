import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';
import { log } from '../utils/logger';

export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): void | Response {
    if (err instanceof ApiError) {
        log.error(err.message);

        return res.status(err.getCode()).json({
            status: 'error',
            message: err.message,
            statusCode: err.getCode(),
            meta: err.getMeta(),
            name: err.getName(),
        });
    } else {
        log.error(`An unexpected error occured ${JSON.stringify(err)}`);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }

    next();
}
