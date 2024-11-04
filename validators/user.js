import Joi from 'joi';

export const registerUserValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('user')
});

export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

 export const updateProfileValidators = Joi.object({
    name: Joi.string(),
    avatar: Joi.string()
});