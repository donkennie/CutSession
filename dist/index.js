"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const validateEnv_1 = __importDefault(require("@/utils/validateEnv"));
const app_1 = __importDefault(require("./app"));
const user_controller_1 = __importDefault(require("@/controllers/user.controller"));
const merchant_controller_1 = __importDefault(require("@/controllers/merchant.controller"));
const studio_controller_1 = __importDefault(require("./controllers/studio.controller"));
const booking_controller_1 = __importDefault(require("./controllers/booking.controller"));
(0, validateEnv_1.default)();
const app = new app_1.default([new user_controller_1.default(), new merchant_controller_1.default(), new studio_controller_1.default(), new booking_controller_1.default()], Number(process.env.PORT));
app.listen();
