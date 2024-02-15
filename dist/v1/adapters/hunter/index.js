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
const crypto_1 = __importDefault(require("crypto"));
const models_1 = require("../../models");
const fullStackChalengeWrapper = ({ pokemonRepository, hunterRepository, whitelistRepository, }) => {
    const postWhitelist = ({ payload, headers, onSuccess, onError, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = payload;
            const newWhitelist = new models_1.Whitelist(email);
            yield (whitelistRepository === null || whitelistRepository === void 0 ? void 0 : whitelistRepository.createEmailWhitelist(newWhitelist));
            return onSuccess({ message: 'OK' });
        }
        catch (errorCatch) {
            return onError(errorCatch);
        }
    });
    const hunterRegistration = ({ payload, headers, onSuccess, onError, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password, address } = payload;
            const hashPassword = crypto_1.default.createHash('md5').update(password).digest("hex");
            // const newWhitelist = new Whitelist(email);
            // await whitelistRepository?.createEmailWhitelist(newWhitelist);
            const whitelist = yield (whitelistRepository === null || whitelistRepository === void 0 ? void 0 : whitelistRepository.getEmailWhitelist(email));
            if (!whitelist) {
                throw boom_1.default.unauthorized("Você não está autorizado, entre em contato com o administrador");
            }
            const hunter = new models_1.Hunter(name, email, hashPassword, address);
            const response = yield (hunterRepository === null || hunterRepository === void 0 ? void 0 : hunterRepository.hunterRegistration(hunter));
            return onSuccess(response);
        }
        catch (errorCatch) {
            return onError(errorCatch);
        }
    });
    const getHunter = ({ payload, headers, onSuccess, onError, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { hunterId } = payload;
            const hunter = yield (hunterRepository === null || hunterRepository === void 0 ? void 0 : hunterRepository.getHunter(hunterId));
            const pokemons = yield (pokemonRepository === null || pokemonRepository === void 0 ? void 0 : pokemonRepository.getPokemons(hunterId));
            return onSuccess({
                name: hunter === null || hunter === void 0 ? void 0 : hunter.name,
                email: hunter === null || hunter === void 0 ? void 0 : hunter.email,
                address: hunter === null || hunter === void 0 ? void 0 : hunter.address,
                pokemons,
            });
        }
        catch (errorCatch) {
            return onError(errorCatch);
        }
    });
    return {
        getHunter,
        postWhitelist,
        hunterRegistration,
    };
};
module.exports = fullStackChalengeWrapper;
//# sourceMappingURL=index.js.map