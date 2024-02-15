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
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const boom_1 = __importDefault(require("@hapi/boom"));
const config_1 = __importDefault(require("../config"));
const validateToken = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = request.headers;
        const { hunterId } = request.query;
        const key = `${config_1.default.app.jwtTokenSecret}`;
        const hunter = yield jwt_simple_1.default.decode(authorization, key);
        if (hunter && hunter.id === hunterId) {
            return true;
        }
        throw boom_1.default.forbidden(`Token invalido`);
    }
    catch (error) {
        throw boom_1.default.forbidden(`Token invalido. ${error.message}`);
    }
});
exports.default = { validateToken };
//# sourceMappingURL=index.js.map