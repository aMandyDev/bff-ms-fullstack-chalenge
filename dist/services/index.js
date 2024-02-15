"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const factory_1 = __importDefault(require("./factory"));
const dependencies = {
    config: config_1.default,
    request: axios_1.default,
};
module.exports = (0, factory_1.default)(dependencies);
//# sourceMappingURL=index.js.map