"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    bookingId: {
        type: String
    },
    sessionId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
    },
    bookingRef: {
        type: String,
    },
    title: {
        type: String
    },
    endsAt: {
        type: Date,
    },
    startsAt: {
        type: Date,
    }
});
exports.default = (0, mongoose_1.model)('Booking', BookingSchema);
