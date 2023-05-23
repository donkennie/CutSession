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
const booking_model_1 = __importDefault(require("@/models/booking.model"));
const mongodb_1 = require("mongodb");
const randomGenerator_1 = __importDefault(require("@/utils/randomGenerator"));
const studio_model_1 = __importDefault(require("@/models/studio.model"));
const user_model_1 = __importDefault(require("@/models/user.model"));
const merchant_model_1 = __importDefault(require("@/models/merchant.model"));
class BookingService {
    constructor() {
        this.bookings = booking_model_1.default;
        this.studios = studio_model_1.default;
        this.users = user_model_1.default;
        this.merchants = merchant_model_1.default;
    }
    BookStudioSession(_id, sessionId, date, userId, notes, title, bookingRef) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingRef = (0, randomGenerator_1.default)();
                const studio = yield studio_model_1.default.findById(sessionId);
                if (!studio) {
                    throw new Error("Not found with the session Id provided.");
                }
                const user = yield user_model_1.default.findById(userId);
                if (!user) {
                    throw new Error("Not found with the user Id provided.");
                }
                const bookSession = yield this.bookings.create({
                    _id: new mongodb_1.ObjectId(),
                    sessionId,
                    date,
                    userId,
                    notes,
                    title,
                    bookingRef
                });
                return {
                    bookingId: bookSession._id.toHexString(),
                    bookingRef: bookSession.bookingRef
                };
            }
            catch (error) {
                throw new Error('Unable to create studio');
            }
        });
    }
    RetriveBookSession(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { city, period, offset, merchantId, limit } = payload;
                const checkMerchantId = yield this.merchants.findById(merchantId);
                if (!checkMerchantId) {
                    throw new Error("Not found with the merchant Id provided.");
                }
                const bookingSession = yield this.bookings.find({
                    merchantId,
                    city
                }).skip((offset - 1) * 50)
                    .limit(limit < 50 ? limit : 50);
                return bookingSession;
            }
            catch (error) {
                throw new Error('Unable to retrive studio');
            }
        });
    }
}
exports.default = BookingService;
