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
const mongodb_1 = require("mongodb");
const mongodb_2 = __importDefault(require("../../common/mongodb"));
const config_1 = __importDefault(require("../../config"));
function hunterRegistration(hunter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield (0, mongodb_2.default)();
            const collection = yield db.collection(`${config_1.default.mongodb.collections.huntersCollection}`);
            collection.createIndex({ 'email': 1 }, { unique: true });
            const result = yield collection.insertOne(Object.assign({}, hunter));
            return result;
        }
        catch (error) {
            throw new Error(`Erro ao cadastrar caçador${error.message}`);
        }
    });
}
function getHunter(hunterId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield (0, mongodb_2.default)();
            const collection = yield db.collection(`${config_1.default.mongodb.collections.huntersCollection}`);
            const result = yield collection.findOne({ _id: new mongodb_1.ObjectId(hunterId) });
            return result;
        }
        catch (error) {
            console.log('Error getHunter', error.message);
            return null;
        }
    });
}
exports.default = {
    getHunter,
    hunterRegistration,
};
//# sourceMappingURL=hunterRepository.js.map