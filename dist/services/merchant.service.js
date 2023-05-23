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
const merchant_model_1 = __importDefault(require("@/models/merchant.model"));
const mongodb_1 = require("mongodb");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class MerchantService {
    constructor() {
        this.merchant = merchant_model_1.default;
    }
    //Register a new merchant
    registerMerchant(_id, name, email, cityOfOperation, username, password, phoneNumber, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingMerchant = yield merchant_model_1.default.findOne({ email });
                if (existingMerchant)
                    throw new Error("Merchant already exists.");
                const newMerchant = yield this.merchant.create({
                    _id: new mongodb_1.ObjectId(),
                    name,
                    email,
                    cityOfOperation,
                    username,
                    password,
                    phoneNumber,
                    metadata,
                });
                const token = jsonwebtoken_1.default.sign({ email: newMerchant.email, id: newMerchant._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
                return newMerchant._id.toHexString();
            }
            catch (error) {
                throw new Error("Something went wrong");
            }
        });
    }
}
exports.default = MerchantService;
