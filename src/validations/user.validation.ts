import Joi from 'joi';

const register = Joi.object({
    name: Joi.string().max(25).min(2).required(),
    dob: Joi.string().isoDate().allow("").allow(null).required(),
    email: Joi.string().max(50).email().required(),
    cityOfResidence: Joi.string().max(20),
    username: Joi.string().max(20).min(6).required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().max(20),
    metadata: Joi.object(),
});

const login = Joi.object({
    username: Joi.string().max(20).min(6).required(),

    password: Joi.string().min(6).required(),

    accessType: Joi.string().valid('USER', 'MERCHANT')
});

export default {register, login};