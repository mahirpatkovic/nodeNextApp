import { ApiError } from './ApiError';

export class NotAuthorizedError extends ApiError {
    constructor(message: string = 'Not Authorized') {
        super(message, 401);
    }
}
