import { ApiError } from './ApiError';

export class ModelNotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404);
    }
}
