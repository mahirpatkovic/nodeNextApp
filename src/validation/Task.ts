import * as Joi from 'joi';
import { LanguageMessages } from 'joi';

export const createTaskSchema: Joi.ObjectSchema = Joi.object({
    title: Joi.string().max(255).required().messages({
        'string.base': 'Title should be a type of text',
        'string.max': 'Title should not exceed 255 characters',
        'string.empty': 'Title is required',
        'any.required': 'Title is required',
    }),
    description: Joi.string().max(255).required().messages({
        'string.base': 'Description should be a type of text',
        'string.max': 'Description should not exceed 255 characters',
        'string.empty': 'Description is required',
        'any.required': 'Description is required',
    }),
    startDate: Joi.date().required().messages({
        'date.base': 'Start date should be a valid date',
        'any.required': 'Start date is required',
    }),
    endDate: Joi.date()
        .required()
        .custom((value, helpers) => {
            const { startDate } = helpers.state.ancestors[0];
            if (value <= startDate) {
                return helpers.message({
                    custom: 'End date should be greater than start date',
                });
            }
            return value;
        })
        .messages({
            'date.base': 'End date should be a valid date',
            'any.required': 'End date is required',
        }),
    user: Joi.string().required().messages({
        'string.base': 'User should be a type of text',
        'string.empty': 'User is required',
        'any.required': 'User is required',
    }),
});
