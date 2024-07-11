import * as express from 'express';
import * as cookieParser from 'cookie-parser';

export function securityMiddleware(app: express.Application): void {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
}
