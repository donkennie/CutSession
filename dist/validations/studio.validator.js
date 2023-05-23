"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const studio = joi_1.default.object({
    startsAt: joi_1.default.string().allow("").allow(null).required(),
    endsAt: joi_1.default.string().allow("").allow(null).required(),
    type: joi_1.default.string().valid('WeekDay', 'WeekEnd')
});
exports.default = { studio };
