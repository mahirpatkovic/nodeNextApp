import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

export const rateLimitMiddleware: RateLimitRequestHandler = rateLimit({
    max: 100,
    windowMs: 5 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
});
