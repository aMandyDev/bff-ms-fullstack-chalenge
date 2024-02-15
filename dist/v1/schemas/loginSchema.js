"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const joi_1 = __importDefault(require("joi"));
const loginSchema = {
    request: {
        login: {
            headers: {},
            payload: joi_1.default.object({
                email: joi_1.default.string().required(),
                password: joi_1.default.string().required(),
            })
        }
    }
};
module.exports = loginSchema;
//# sourceMappingURL=loginSchema.js.map