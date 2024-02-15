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
const boom_1 = __importDefault(require("@hapi/boom"));
const models_1 = require("../../models");
const moment_1 = __importDefault(require("moment"));
const pokemonWrapper = ({ services, pokemonRepository, hunterRepository, }) => {
    const huntPokemon = ({ payload, onSuccess, onError, }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const { hunterId } = payload;
            const { results: pokemons } = yield (services === null || services === void 0 ? void 0 : services.pokemonService.huntPokemon());
            if (!pokemons.length) {
                throw boom_1.default.expectationFailed('Error on pokeAPI');
            }
            const randomIndex = Math.floor(Math.random() * pokemons.length);
            const { name, url } = pokemons[randomIndex];
            const [, number] = url === null || url === void 0 ? void 0 : url.match(/\/(\d+)\/?$/);
            const pokemonsHunter = yield (pokemonRepository === null || pokemonRepository === void 0 ? void 0 : pokemonRepository.getPokemons(hunterId));
            if (pokemonsHunter.some((poke) => poke.number === number)) {
                throw boom_1.default.expectationFailed('Você parece ser um caçador inexperiente');
            }
            const pokemon = yield (services === null || services === void 0 ? void 0 : services.pokemonService.huntPokemon(number));
            const capturedPokemon = {
                name,
                number,
                height: pokemon === null || pokemon === void 0 ? void 0 : pokemon.height,
                weight: pokemon === null || pokemon === void 0 ? void 0 : pokemon.weight,
                image: (_c = (_b = (_a = pokemon === null || pokemon === void 0 ? void 0 : pokemon.sprites) === null || _a === void 0 ? void 0 : _a.other) === null || _b === void 0 ? void 0 : _b.home) === null || _c === void 0 ? void 0 : _c.front_default,
                types: (_d = pokemon === null || pokemon === void 0 ? void 0 : pokemon.types) === null || _d === void 0 ? void 0 : _d.map((type) => type.type.name),
                abilities: (_e = pokemon === null || pokemon === void 0 ? void 0 : pokemon.abilities) === null || _e === void 0 ? void 0 : _e.map((ability) => ability.ability.name),
            };
            return onSuccess(capturedPokemon);
        }
        catch (errorCatch) {
            return onError(errorCatch);
        }
    });
    const registerPokemon = ({ payload, onSuccess, onError, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { hunterId, name, number, height, weight, image, types, abilities } = payload;
            const hunter = yield (hunterRepository === null || hunterRepository === void 0 ? void 0 : hunterRepository.getHunter(hunterId));
            if (!hunter) {
                throw boom_1.default.notFound('Caçador não encontrado');
            }
            const captured = (0, moment_1.default)().format('DD/MM/YYYY');
            const pokemon = new models_1.Pokemon(hunterId, name, number, height, weight, image, captured, types, abilities);
            const registre = yield (pokemonRepository === null || pokemonRepository === void 0 ? void 0 : pokemonRepository.registerPokemon(pokemon));
            return onSuccess(registre);
        }
        catch (errorCatch) {
            return onError(errorCatch);
        }
    });
    const putPokemon = ({ payload, onSuccess, onError, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { hunterId, pokemonId, name } = payload;
            yield (pokemonRepository === null || pokemonRepository === void 0 ? void 0 : pokemonRepository.updatePokemon(hunterId, pokemonId, name));
            const pokemon = yield (pokemonRepository === null || pokemonRepository === void 0 ? void 0 : pokemonRepository.getPokemon(pokemonId));
            return onSuccess(pokemon);
        }
        catch (errorCatch) {
            return onError(errorCatch);
        }
    });
    return {
        putPokemon,
        huntPokemon,
        registerPokemon,
    };
};
module.exports = pokemonWrapper;
//# sourceMappingURL=index.js.map