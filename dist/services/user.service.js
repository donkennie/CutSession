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
const user_model_1 = __importDefault(require("@/models/user.model"));
const jwtToken_1 = __importDefault(require("@/utils/jwtToken"));
const mongodb_1 = require("mongodb");
const merchant_model_1 = __importDefault(require("@/models/merchant.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
        this.user = user_model_1.default;
        this.merchant = merchant_model_1.default;
    }
    //Register a new user
    register(_id, name, dob, email, cityOfResidence, username, password, phoneNumber, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.user.findOne({ email });
                if (existingUser != null) {
                    throw new Error("User already exists.");
                }
                const newUser = yield this.user.create({
                    _id: new mongodb_1.ObjectId(),
                    name,
                    dob,
                    email,
                    cityOfResidence,
                    username,
                    password,
                    phoneNumber,
                    metadata,
                });
                const accessToken = jwtToken_1.default.createToken(newUser);
                return newUser._id.toHexString();
            }
            catch (error) {
                throw new Error("You've entered wrong credentials");
            }
        });
    }
    //login an authenticated user
    AuthenticateUser(username, password, accessType) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                try {
                    const user = yield this.user.findOne({ username });
                    if (!user) {
                        throw new Error('Unable to find user with that username');
                    }
                    if (yield user.isValidPassword(password)) {
                        const token = jwtToken_1.default.createToken(user);
                        return { token, userId: user._id.toString() };
                    }
                    else {
                        throw new Error('Wrong credentials given');
                    }
                }
                catch (error) {
                    throw new Error("Something went wrong");
                }
            }
        });
    }
    AuthenticateMerchant(username, password, accessType) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                try {
                    const merchant = yield this.merchant.findOne({ username });
                    if (!merchant) {
                        throw new Error('Unable to find merchant with that username');
                    }
                    if (yield merchant.isValidPassword(password)) {
                        const token = jsonwebtoken_1.default.sign({ email: merchant.email, id: merchant._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
                        return { token, merchantId: merchant._id.toString() };
                    }
                    else {
                        throw new Error('Wrong credentials given');
                    }
                }
                catch (error) {
                    throw new Error("Something went wrong");
                }
            }
        });
    }
}
exports.default = UserService;
