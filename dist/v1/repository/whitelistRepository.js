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
function createEmailWhitelist(whitelist) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield (0, mongodb_1.default)();
            const collection = yield db.collection(`${config_1.default.mongodb.collections.whitelistCollection}`);
            collection.createIndex({ 'email': 1 }, { unique: true });
            return yield collection.insertOne(Object.assign({}, whitelist));
        }
        catch (error) {
            throw new Error(`Erro ao cadastrar email${error.message}`);
        }
    });
}
function getEmailWhitelist(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield (0, mongodb_1.default)();
            const collection = yield db.collection(`${config_1.default.mongodb.collections.whitelistCollection}`);
            return yield collection.findOne({ email }, { projection: { _id: 0 } });
        }
        catch (error) {
            throw new Error(`Erro ao consultar email em whitelist${error.message}`);
        }
    });
}
exports.default = {
    createEmailWhitelist,
    getEmailWhitelist,
};
//# sourceMappingURL=whitelistRepository.js.map