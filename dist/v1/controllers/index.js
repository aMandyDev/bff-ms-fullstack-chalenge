"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = __importDefault(require("./factory"));
const services_1 = __importDefault(require("../../services"));
const adapters_1 = __importDefault(require("../adapters"));
const config_1 = __importDefault(require("../../config"));
const repository_1 = require("../repository");
const controllers = (0, factory_1.default)((0, adapters_1.default)({
    config: config_1.default,
    loginRepository: repository_1.loginRepository,
    hunterRepository: repository_1.hunterRepository,
    whitelistRepository: repository_1.whitelistRepository,
    pokemonRepository: repository_1.pokemonRepository,
    services: services_1.default,
}));
exports.default = controllers;
//# sourceMappingURL=index.js.map