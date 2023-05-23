"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const booking = joi_1.default.object({
    sessionId: joi_1.default.string().max(100).min(15).required(),
    date: joi_1.default.string().allow("").allow(null).required(),
    userId: joi_1.default.string().max(100).min(15).required(),
    notes: joi_1.default.string().max(500).required(),
    title: joi_1.default.string().max(75).required(),
});
exports.default = { booking };
