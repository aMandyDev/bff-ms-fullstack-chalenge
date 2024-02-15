"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const joi_1 = __importDefault(require("joi"));
const name = joi_1.default.string().required();
const hunterId = joi_1.default.string().required();
const pokemonSchema = {
    request: {
        registerPokemon: {
            headers: {
                'authorization': joi_1.default.string().required(),
            },
            query: {
                hunterId,
            },
            payload: joi_1.default.object({
                name,
                number: joi_1.default.string().required(),
                height: joi_1.default.number().required(),
                weight: joi_1.default.number().required(),
                image: joi_1.default.string().required(),
                types: joi_1.default.array().items(name).required(),
                abilities: joi_1.default.array().items(name).required(),
            }),
        },
        putPokemon: {
            headers: {
                'authorization': joi_1.default.string().required(),
            },
            query: {
                hunterId,
            },
            payload: joi_1.default.object({
                name,
                pokemonId: joi_1.default.string().required(),
            }),
        }
    }
};
module.exports = pokemonSchema;
//# sourceMappingURL=pokemonSchema.js.map