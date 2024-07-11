import * as Joi from 'joi';

export const createOrderSchema: Joi.ObjectSchema = Joi.object({
    order_date: Joi.date()
        .default(() => new Date())
        .messages({
            'date.base': 'Order date should be a valid date',
            'date.empty': 'Order date cannot be an empty field',
            'any.required': 'Order date is a required field',
        }),
    total_amount: Joi.number().positive().precision(2).required().messages({
        'number.base': 'Total amount should be a number',
        'number.positive': 'Total amount should be a positive number',
        'number.empty': 'Total amount cannot be an empty field',
        'any.required': 'Total amount is a required field',
        'number.precision': 'Total amount can have at most 2 decimal places',
    }),
});
