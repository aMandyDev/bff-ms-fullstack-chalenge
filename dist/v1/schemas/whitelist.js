"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const joi_1 = __importDefault(require("joi"));
const pokemonSchema = {
    request: {
        whitelist: {
            payload: joi_1.default.object({
                email: joi_1.default.string().required(),
            }),
        }
    }
};
module.exports = pokemonSchema;
//# sourceMappingURL=whitelist.js.map