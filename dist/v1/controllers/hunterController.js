"use strict";
const hunterControllerWrapper = (adapters) => {
    const hunterRegistration = (request, reply) => {
        const payload = Object.assign({}, request.payload);
        return adapters.hunterRegistration({
            payload,
            headers: Object.assign({}, request.headers),
            onSuccess: (data) => {
                return reply.response(data).code(200);
            },
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
    const postWhitelist = (request, reply) => {
        const payload = Object.assign({}, request.payload);
        return adapters.postWhitelist({
            payload,
            headers: Object.assign({}, request.headers),
            onSuccess: (data) => {
                return reply.response(data).code(200);
            },
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
    const getHunter = (request, reply) => {
        const payload = Object.assign({}, request.query);
        return adapters.getHunter({
            payload,
            headers: Object.assign({}, request.headers),
            onSuccess: (data) => {
                return reply.response(data).code(200);
            },
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
        getHunter,
        postWhitelist,
        hunterRegistration,
    };
};
module.exports = hunterControllerWrapper;
//# sourceMappingURL=hunterController.js.map