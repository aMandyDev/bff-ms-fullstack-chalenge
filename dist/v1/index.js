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
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
const joi_1 = __importDefault(require("joi"));
const swagger_1 = require("../swagger");
const config_1 = __importDefault(require("../config"));
const routes_1 = __importDefault(require("./routes"));
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = hapi_1.default.server({ port: config_1.default.app.port, router: { isCaseSensitive: false } });
    server.validator(joi_1.default);
    server.realm.modifiers.route.prefix = config_1.default.stripPrefix.path;
    server.route(routes_1.default);
    yield (0, swagger_1.registerSwaggerPlugin)(server);
    yield server.start();
    console.info({
        message: `App running on ${server.info.protocol}://${server.info.host}:${server.info.port}${config_1.default.stripPrefix.path}/docs`,
    });
});
init();
//# sourceMappingURL=index.js.map