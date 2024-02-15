"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const hunter_1 = __importDefault(require("./hunter"));
const login_1 = __importDefault(require("./login"));
const pokemon_1 = __importDefault(require("./pokemon"));
module.exports = (dependencies) => ({
    postWhitelist: (0, hunter_1.default)({
        whitelistRepository: dependencies.whitelistRepository,
    }).postWhitelist,
    getHunter: (0, hunter_1.default)({
        hunterRepository: dependencies.hunterRepository,
        pokemonRepository: dependencies.pokemonRepository,
    }).getHunter,
    hunterRegistration: (0, hunter_1.default)({
        hunterRepository: dependencies.hunterRepository,
        whitelistRepository: dependencies.whitelistRepository,
    }).hunterRegistration,
    authentication: (0, login_1.default)({
        config: dependencies.config,
        loginRepository: dependencies.loginRepository,
    }).authentication,
    huntPokemon: (0, pokemon_1.default)({
        pokemonRepository: dependencies.pokemonRepository,
        services: dependencies.services,
    }).huntPokemon,
    registerPokemon: (0, pokemon_1.default)({
        services: dependencies.services,
        pokemonRepository: dependencies.pokemonRepository,
        hunterRepository: dependencies.hunterRepository,
    }).registerPokemon,
    putPokemon: (0, pokemon_1.default)({
        pokemonRepository: dependencies.pokemonRepository,
    }).putPokemon,
});
//# sourceMappingURL=index.js.map