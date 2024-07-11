import { ApiError } from './ApiError';

export class DuplicateRecordError extends ApiError {
    constructor(message: string = 'Duplicate Error', meta: any = null) {
        super(message, 409, meta);
    }
}
