import * as Joi from 'joi';

export const registerUserSchema: Joi.ObjectSchema = Joi.object({
    username: Joi.string().max(20).required().messages({
        'string.base': 'Username should be a type of text',
        'string.empty': 'Username cannot be an empty field',
        'string.max': 'Username should have a maximum length of 100 characters',
        'any.required': 'Username is a required field',
    }),
    email: Joi.string().email().max(50).required().messages({
        'string.base': 'Email should be a type of text',
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email cannot be an empty field',
        'string.max': 'Email should have a maximum length of 100 characters',
        'any.required': 'Email is a required field',
    }),
    password: Joi.string()
        .pattern(
            new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
            ),
        )
        .max(20)
        .required()
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password cannot be an empty field',
            'string.max':
                'Password should have a maximum length of 100 characters',
            'any.required': 'Password is a required field',
            'string.pattern.base':
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special symbol',
        }),
});

export const loginUserSchema: Joi.ObjectSchema = Joi.object({
    username: Joi.string().max(20).required().messages({
        'string.base': 'Username should be a type of text',
        'string.empty': 'Username cannot be an empty field',
        'string.max': 'Username should have a maximum length of 20 characters',
        'any.required': 'Username is a required field',
    }),
    password: Joi.string().max(20).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password cannot be an empty field',
        'string.max': 'Password should have a maximum length of 20 characters',
        'any.required': 'Password is a required field',
    }),
});
