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
const mongodb_1 = __importDefault(require("../../common/mongodb"));
const config_1 = __importDefault(require("../../config"));
function authentication(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield (0, mongodb_1.default)();
            const collection = yield db.collection(`${config_1.default.mongodb.collections.huntersCollection}`);
            const hunter = yield collection.findOne({ email, password });
            return {
                id: hunter === null || hunter === void 0 ? void 0 : hunter._id,
                email: hunter === null || hunter === void 0 ? void 0 : hunter.email
            };
        }
        catch (error) {
            throw new Error(`Erro Login ${error.message}`);
        }
    });
}
exports.default = {
    authentication,
};
//# sourceMappingURL=loginRepository.js.map