"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const exception_middleware_1 = __importDefault(require("@/middleware/exception.middleware"));
const merchant_validator_1 = __importDefault(require("@/validations/merchant.validator"));
const merchant_service_1 = __importDefault(require("@/services/merchant.service"));
class MerchantController {
    constructor() {
        this.path = '/register';
        this.router = (0, express_1.Router)();
        this.MerchantService = new merchant_service_1.default();
        this.registerMerchant = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, name, email, cityOfOperation, username, password, phoneNumber, metadata } = req.body;
                const newMerchant = yield this.MerchantService.registerMerchant(_id, name, email, cityOfOperation, username, password, phoneNumber, metadata);
                res.status(201).json({ merchantId: newMerchant });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}/merchants`, (0, exception_middleware_1.default)(merchant_validator_1.default.merchant), this.registerMerchant);
    }
}
exports.default = MerchantController;
