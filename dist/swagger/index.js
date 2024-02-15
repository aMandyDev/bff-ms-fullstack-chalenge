"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.healthcheck = exports.registerSwaggerPlugin = void 0;
const Inert = __importStar(require("@hapi/inert"));
const Vision = __importStar(require("@hapi/vision"));
const HapiSwagger = __importStar(require("hapi-swagger"));
const config_1 = __importDefault(require("../config"));
const package_json_1 = require("../package.json");
const { stripPrefix: { path } } = config_1.default;
const swaggerOptions = {
    info: {
        title: 'API Documentation',
        version: package_json_1.version,
    },
    documentationPath: '/docs',
    basePath: path,
};
const registerSwaggerPlugin = (server) => __awaiter(void 0, void 0, void 0, function* () {
    yield server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);
});
exports.registerSwaggerPlugin = registerSwaggerPlugin;
exports.healthcheck = {
    method: 'GET',
    path: '/healthcheck',
    handler: () => `Server version: ${package_json_1.version}`
};
//# sourceMappingURL=index.js.map