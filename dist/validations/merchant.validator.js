"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const merchant = joi_1.default.object({
    name: joi_1.default.string().max(25).min(2).required(),
    email: joi_1.default.string().max(50).email().required(),
    cityOfOperation: joi_1.default.string().max(20),
    username: joi_1.default.string().max(20).min(6).required(),
    password: joi_1.default.string().min(6).required(),
    phoneNumber: joi_1.default.string().max(20),
    metadata: joi_1.default.object(),
});
exports.default = { merchant };
