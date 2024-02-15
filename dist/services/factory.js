"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pokemonService_1 = __importDefault(require("./pokemonService"));
const factory = (dependencies) => ({
    pokemonService: (0, pokemonService_1.default)(dependencies),
});
module.exports = factory;
//# sourceMappingURL=factory.js.map