"use strict";
const loginWrapper = (adapters) => {
    const authentication = (request, reply) => {
        const payload = Object.assign({}, request.payload);
        return adapters.authentication({
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
        authentication,
    };
};
module.exports = loginWrapper;
//# sourceMappingURL=loginController.js.map