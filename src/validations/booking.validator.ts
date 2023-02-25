import Joi from 'joi';

const booking = Joi.object({
    sessionId: Joi.string().max(100).min(15).required(),
    date: Joi.string().allow("").allow(null).required(),
    userId: Joi.string().max(100).min(15).required(),
    notes: Joi.string().max(500).required(),
    title: Joi.string().max(75).required(),
});

export default {booking};