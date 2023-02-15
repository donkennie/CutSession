import Joi from 'joi';

const merchant = Joi.object({
    name: Joi.string().max(25).min(2).required(),
    email: Joi.string().max(50).email().required(),
    cityOfOperation: Joi.string().max(20),
    username: Joi.string().max(20).min(6).required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().max(20),
    metadata: Joi.object(),
});

export default {merchant};