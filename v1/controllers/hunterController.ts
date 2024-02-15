const hunterControllerWrapper = (adapters:any) => {
  const hunterRegistration = (request:any, reply:any) => {
    const payload = {
      ...request.payload,
    };
    return adapters.hunterRegistration({
      payload,
      headers: {
        ...request.headers,
      },
      onSuccess: (data:any) => {
        return reply.response(data).code(200);
      },
      onError: (error:any) => {
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
  const postWhitelist = (request:any, reply:any) => {
    const payload = {
      ...request.payload,
    };
    return adapters.postWhitelist({
      payload,
      headers: {
        ...request.headers,
      },
      onSuccess: (data:any) => {
        return reply.response(data).code(200);
      },
      onError: (error:any) => {
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
  const getHunter = (request:any, reply:any) => {
    const payload = {
      ...request.query,
    };
    return adapters.getHunter({
      payload,
      headers: {
        ...request.headers,
      },
      onSuccess: (data:any) => {
        return reply.response(data).code(200);
      },
      onError: (error:any) => {
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

export = hunterControllerWrapper;

