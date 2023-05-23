"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var Type;
(function (Type) {
    Type["WEEKDAY"] = "WeekDay";
    Type["WEEKEND"] = "WeekEnd";
})(Type || (Type = {}));
const StudioSchema = new mongoose_1.Schema({
    startsAt: {
        type: Date,
        required: true,
    },
    endsAt: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: [Type.WEEKDAY, Type.WEEKEND],
        default: Type.WEEKDAY,
        required: true
    }
});
exports.default = (0, mongoose_1.model)('Studio', StudioSchema);
