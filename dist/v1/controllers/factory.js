"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const hunterController_1 = __importDefault(require("./hunterController"));
const loginController_1 = __importDefault(require("./loginController"));
const pokemonController_1 = __importDefault(require("./pokemonController"));
module.exports = (adapters) => ({
    getHunter: (0, hunterController_1.default)(adapters).getHunter,
    postWhitelist: (0, hunterController_1.default)(adapters).postWhitelist,
    hunterRegistration: (0, hunterController_1.default)(adapters).hunterRegistration,
    authentication: (0, loginController_1.default)(adapters).authentication,
    huntPokemon: (0, pokemonController_1.default)(adapters).huntPokemon,
    registerPokemon: (0, pokemonController_1.default)(adapters).registerPokemon,
    putPokemon: (0, pokemonController_1.default)(adapters).putPokemon,
});
//# sourceMappingURL=factory.js.map