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
const studio_model_1 = __importDefault(require("@/models/studio.model"));
const merchant_model_1 = __importDefault(require("@/models/merchant.model"));
const studio_service_1 = __importDefault(require("@/services/studio.service"));
const studio_validator_1 = __importDefault(require("@/validations/studio.validator"));
class StudioController {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.StudioService = new studio_service_1.default();
        this.getStudioSessions = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const merchant = yield merchant_model_1.default.findById(req.params.merchantId);
                if (!merchant) {
                    res.status(404).json("No merchant found with this Id");
                }
                const fetchStudio = yield studio_model_1.default.find({}, { __v: 0 }).lean();
                const studios = fetchStudio.map((studio) => (Object.assign(Object.assign({}, studio), { merchantId: merchant === null || merchant === void 0 ? void 0 : merchant._id })));
                if (studios.length === 0) {
                    return res.status(404).json("No studios found");
                }
                return res.status(201).json(studios);
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.createStudioSession = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, merchantId, startsAt, endsAt, type } = req.body;
                const merchant = yield merchant_model_1.default.findById(req.params.merchantId);
                if (!merchant) {
                    res.status(404).json("No merchant found with this Id");
                }
                const createStudioSessions = yield this.StudioService.createStudio(_id, merchantId, startsAt, endsAt, type);
                res.status(201).json({ sessionId: createStudioSessions });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`$/studios/:merchantId`, (0, exception_middleware_1.default)(studio_validator_1.default.studio), this.createStudioSession);
        this.router.get(`/studios/:merchantId`, this.getStudioSessions);
    }
}
exports.default = StudioController;
