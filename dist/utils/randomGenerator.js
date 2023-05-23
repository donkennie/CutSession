"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function generateRandomString() {
    const length = Math.floor(Math.random() * (9 - 6 + 1)) + 6; // generate a random length between 6 to 9
    return crypto_1.default.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length); // generate a random string of the specified length
}
exports.default = generateRandomString;
