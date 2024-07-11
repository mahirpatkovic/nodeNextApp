import * as Joi from 'joi';

export const createCommentSchema: Joi.ObjectSchema = Joi.object({
    content: Joi.string().max(255).required().messages({
        'string.base': 'Content should be a type of text',
        'string.max': 'Content should have a maximum length of 255 characters',
        'string.empty': 'Content cannot be an empty field',
        'any.required': 'Content is a required field',
    }),
    post: Joi.string().required(),
});
