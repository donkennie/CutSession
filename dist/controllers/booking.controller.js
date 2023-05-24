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
const exception_middleware_1 = __importDefault(require("@/middleware/exception.middleware"));
const booking_service_1 = __importDefault(require("@/services/booking.service"));
const booking_validator_1 = __importDefault(require("@/validations/booking.validator"));
class BookingController {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.BookingService = new booking_service_1.default();
        this.bookStudioSession = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, sessionId, date, userId, notes, title, bookingRef } = req.body;
                const booking = yield this.BookingService.BookStudioSession(_id, sessionId, date, userId, notes, title, bookingRef);
                res.status(201).json({ booking });
            }
            catch (error) {
                return res.status(404).json("Error found from the request!");
            }
        });
        this.RetrivedBookSession = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { city, limit, offset, period, merchantId } = req.query;
                //const merchantId = req.params.merchantId;
                const result = yield this.BookingService.RetriveBookSession({
                    city: city,
                    offset: parseInt(offset),
                    limit: parseInt(limit),
                    period: period,
                    merchantId: merchantId
                });
                res.status(200).json(result);
            }
            catch (error) {
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`/bookings`, (0, exception_middleware_1.default)(booking_validator_1.default.booking), this.bookStudioSession);
        this.router.get(`/bookings`, this.RetrivedBookSession);
    }
}
exports.default = BookingController;
