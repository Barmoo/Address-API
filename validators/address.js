import Joi from 'joi';

export const addAddressValidator = Joi.object({
    title: Joi.string().required(),
    icon: Joi.string().required()
});

export const updateAddressValidator = Joi.object({
    title: Joi.string(),
    icon: Joi.string(),
    completed: Joi.boolean()
});