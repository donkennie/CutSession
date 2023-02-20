import Joi from 'joi';

const studio = Joi.object({
   startsAt: Joi.string().allow("").allow(null).required(),
   endsAt: Joi.string().allow("").allow(null).required(),
   type: Joi.string().valid('WeekDay', 'WeekEnd')
});

export default {studio};