"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const joi_1 = __importDefault(require("joi"));
const hunterSchema = {
    request: {
        hunterRegistration: {
            headers: {},
            payload: joi_1.default.object({
                name: joi_1.default.string().required(),
                email: joi_1.default.string().required(),
                password: joi_1.default.string().required(),
                address: joi_1.default.object({
                    street: joi_1.default.string().required(),
                    number: joi_1.default.string().required(),
                    neighborhood: joi_1.default.string().required(),
                    city: joi_1.default.string().required(),
                    state: joi_1.default.string().required(),
                })
            })
        },
        hunter: {
            headers: {
                'authorization': joi_1.default.string().required(),
            },
            query: {
                hunterId: joi_1.default.string().required(),
            }
        },
    }
};
module.exports = hunterSchema;
//# sourceMappingURL=hunterSchema.js.map