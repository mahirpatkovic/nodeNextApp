import { ApiError } from './ApiError';
import { ValidationError as JoiValidationError } from 'joi';

export class ValidationError extends ApiError {
    constructor(error: JoiValidationError) {
        const validationErrors = error.details.map((detail) => ({
            field: detail.context.key,
            message: detail.message,
        }));

        const mainMessage =
            validationErrors.length > 0
                ? validationErrors[0].message
                : 'Validation error';

        super(mainMessage, 400, validationErrors);
    }
}
