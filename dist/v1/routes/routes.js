"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.hunterRegistration = exports.registerPokemon = exports.postWhiteList = exports.huntPokemon = exports.getHunter = exports.putPokemon = void 0;
const controllers_1 = __importDefault(require("../controllers"));
const middlewares_1 = __importDefault(require("../../middlewares"));
const schemas_1 = require("../schemas");
const hunterRegistration = {
    method: 'post',
    path: '/v1/fullStackChalenge/hunter/registration',
    options: {
        description: 'Registra um novo caçador',
        tags: ['api'],
        handler: controllers_1.default.hunterRegistration,
        validate: {
            options: {
                allowUnknown: true,
            },
            headers: schemas_1.hunterSchema.request.hunterRegistration.headers,
            payload: schemas_1.hunterSchema.request.hunterRegistration.payload,
        },
    },
};
exports.hunterRegistration = hunterRegistration;
const getHunter = {
    method: 'GET',
    path: '/v1/fullStackChalenge/hunter',
    options: {
        description: 'Consulta caçador por id',
        tags: ['api'],
        pre: [{ method: middlewares_1.default.validateToken }],
        handler: controllers_1.default.getHunter,
        validate: {
            options: {
                allowUnknown: true,
            },
            headers: schemas_1.hunterSchema.request.hunter.headers,
            query: schemas_1.hunterSchema.request.hunter.query,
        },
    },
};
exports.getHunter = getHunter;
const authentication = {
    method: 'post',
    path: '/v1/fullStackChalenge/authentication',
    options: {
        description: 'Login',
        tags: ['api'],
        handler: controllers_1.default.authentication,
        validate: {
            options: {
                allowUnknown: true,
            },
            headers: schemas_1.loginSchema.request.login.headers,
            payload: schemas_1.loginSchema.request.login.payload,
        },
    },
};
exports.authentication = authentication;
const huntPokemon = {
    method: 'GET',
    path: '/v1/fullStackChalenge/pokemon/hunt',
    options: {
        description: 'Caça Pokémon',
        tags: ['api'],
        pre: [{ method: middlewares_1.default.validateToken }],
        handler: controllers_1.default.huntPokemon,
        validate: {
            options: {
                allowUnknown: true,
            },
            headers: schemas_1.pokemonSchema.request.registerPokemon.headers,
            query: schemas_1.pokemonSchema.request.registerPokemon.query,
        },
    },
};
exports.huntPokemon = huntPokemon;
const registerPokemon = {
    method: 'POST',
    path: '/v1/fullStackChalenge/pokemon/register',
    options: {
        description: 'Registra pokemon',
        tags: ['api'],
        pre: [{ method: middlewares_1.default.validateToken }],
        handler: controllers_1.default.registerPokemon,
        validate: {
            options: {
                allowUnknown: true,
            },
            headers: schemas_1.pokemonSchema.request.registerPokemon.headers,
            payload: schemas_1.pokemonSchema.request.registerPokemon.payload,
            query: schemas_1.pokemonSchema.request.registerPokemon.query
        },
    },
};
exports.registerPokemon = registerPokemon;
const putPokemon = {
    method: 'PUT',
    path: '/v1/fullStackChalenge/pokemon',
    options: {
        description: 'Edita um pokemon',
        tags: ['api'],
        pre: [{ method: middlewares_1.default.validateToken }],
        handler: controllers_1.default.putPokemon,
        validate: {
            options: {
                allowUnknown: true,
            },
            headers: schemas_1.pokemonSchema.request.putPokemon.headers,
            payload: schemas_1.pokemonSchema.request.putPokemon.payload,
            query: schemas_1.pokemonSchema.request.putPokemon.query
        },
    },
};
exports.putPokemon = putPokemon;
const postWhiteList = {
    method: 'post',
    path: '/v1/fullStackChalenge/whitelist/email',
    options: {
        description: 'Cencede acesso ao email do caçador',
        tags: ['api'],
        handler: controllers_1.default.postWhitelist,
        validate: {
            options: {
                allowUnknown: true,
            },
            payload: schemas_1.whitelistSchema.request.whitelist.payload,
        },
    },
};
exports.postWhiteList = postWhiteList;
//# sourceMappingURL=routes.js.map