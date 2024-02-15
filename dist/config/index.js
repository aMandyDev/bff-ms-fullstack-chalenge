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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class Config {
    constructor() {
        this.data = {
            app: this.getAppData(),
            services: this.getServicesData(),
            mongodb: this.getMongoData(),
            stripPrefix: this.stripPrefix(),
        };
    }
    stripPrefix() {
        return {
            path: `/api/${process.env.SERVICE_NAME.replace(/-/g, '')}`,
        };
    }
    getAppData() {
        return {
            port: process.env.PORT,
            jwtTokenSecret: process.env.JWT_TOKEN_SECRET,
        };
    }
    getServicesData() {
        return {
            pokemon: {
                host: process.env.POKEMON_HOST,
                path: process.env.POKEMON_ROUTE,
            },
        };
    }
    getMongoData() {
        return {
            uri: process.env.MONGO_HOST,
            base: process.env.MONGO_DATABASE,
            collections: {
                huntersCollection: process.env.MONGO_COLLECTIONS_HUNTERS,
                pokemonsCollection: process.env.MONGO_COLLECTIONS_POKEMONS,
                whitelistCollection: process.env.MONGO_COLLECTIONS_WHITELIST,
            }
        };
    }
    ;
}
const instance = new Config().data;
Object.freeze(instance);
module.exports = instance;
//# sourceMappingURL=index.js.map