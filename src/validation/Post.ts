import * as Joi from 'joi';

export const createPostSchema: Joi.ObjectSchema = Joi.object({
    title: Joi.string().max(255).required().messages({
        'string.base': 'Title should be a type of text',
        'string.empty': 'Title cannot be an empty field',
        'string.max': 'Title should have a maximum length of 255 characters',
        'any.required': 'Title is a required field',
    }),
    content: Joi.string().max(255).required().messages({
        'string.base': 'Content should be a type of text',
        'string.empty': 'Content cannot be an empty field',
        'string.max': 'Content should have a maximum length of 255 characters',
        'any.required': 'Content is a required field',
    }),
});
