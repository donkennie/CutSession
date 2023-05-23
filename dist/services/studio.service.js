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
const studio_model_1 = __importDefault(require("@/models/studio.model"));
const merchant_model_1 = __importDefault(require("@/models/merchant.model"));
const mongodb_1 = require("mongodb");
class StudioService {
    constructor() {
        this.studio = studio_model_1.default;
        this.merchant = merchant_model_1.default;
    }
    createStudio(_id, merchantId, startsAt, endsAt, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createStudio = yield this.studio.create({
                    _id: new mongodb_1.ObjectId(),
                    merchantId,
                    startsAt,
                    endsAt,
                    type
                });
                return createStudio._id.toHexString();
            }
            catch (error) {
                throw new Error('Unable to create studio');
            }
        });
    }
}
exports.default = StudioService;
