import * as Joi from 'joi';

export const createCustomerSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().max(255).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be an empty field',
        'string.max': 'Name should have a maximum length of 255 characters',
        'any.required': 'Name is a required field',
    }),
    email: Joi.string().email().max(255).required().messages({
        'string.base': 'Email should be a type of text',
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email cannot be an empty field',
        'string.max': 'Email should have a maximum length of 255 characters',
        'any.required': 'Email is a required field',
    }),
    phone_number: Joi.string()
        .pattern(/^[0-9]{8,15}$/)
        .required()
        .messages({
            'string.base': 'Phone number should be a type of text',
            'string.empty': 'Phone number cannot be an empty field',
            'string.pattern.base':
                'Phone number must be a valid number with 8 to 15 digits',
            'any.required': 'Phone number is a required field',
        }),
});
