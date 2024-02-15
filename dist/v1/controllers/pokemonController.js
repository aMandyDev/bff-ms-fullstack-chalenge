"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemonWrapper = (adapters) => {
    const putPokemon = (request, reply) => adapters.putPokemon({
        payload: Object.assign(Object.assign({}, request.query), request.payload),
        headers: Object.assign({}, request.headers),
        onSuccess: (data) => reply.response(data).code(200),
        onError: (error) => {
            const response = {
                statusCode: 500,
                message: error.message,
            };
            if (error.isBoom) {
                response.statusCode = error.output.statusCode;
            }
            console.error('Error:', JSON.stringify(response, null, 2));
            return reply.response(response).code(response.statusCode);
        },
    });
    const huntPokemon = (request, reply) => adapters.huntPokemon({
        payload: Object.assign({}, request.query),
        headers: Object.assign({}, request.headers),
        onSuccess: (data) => reply.response(data).code(200),
        onError: (error) => {
            const response = {
                statusCode: 500,
                message: error.message,
            };
            if (error.isBoom) {
                response.statusCode = error.output.statusCode;
            }
            console.error('Error:', JSON.stringify(response, null, 2));
            return reply.response(response).code(response.statusCode);
        },
    });
    const registerPokemon = (request, reply) => {
        const payload = Object.assign(Object.assign({}, request.query), request.payload);
        return adapters.registerPokemon({
            payload,
            headers: Object.assign({}, request.headers),
            onSuccess: (data) => reply.response(data).code(200),
            onError: (error) => {
                const response = {
                    statusCode: 500,
                    message: error.message,
                };
                if (error.isBoom) {
                    response.statusCode = error.output.statusCode;
                }
                console.error('Error:', JSON.stringify(response, null, 2));
                return reply.response(response).code(response.statusCode);
            },
        });
    };
    return {
        putPokemon,
        huntPokemon,
        registerPokemon,
    };
};
exports.default = pokemonWrapper;
//# sourceMappingURL=pokemonController.js.map