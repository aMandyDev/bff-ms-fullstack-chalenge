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
const pokemonService = ({ config, request, }) => {
    const { services: { pokemon: { host: baseURL, path, } }, } = config;
    const huntPokemon = (number = undefined) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const queryString = number ? `/${number}` : '?offset=0&limit=600';
            const { data } = yield request({
                method: 'GET',
                baseURL,
                url: `${path}${queryString}`,
            });
            return data;
        }
        catch (errorCatch) {
            const { status, data } = errorCatch === null || errorCatch === void 0 ? void 0 : errorCatch.response;
            throw {
                message: `Error on service pokemon ${baseURL}${path}. [${data.message || errorCatch.message}]`,
                statusCode: status || 500,
                errorCatch,
            };
        }
    });
    return { huntPokemon };
};
module.exports = pokemonService;
//# sourceMappingURL=index.js.map