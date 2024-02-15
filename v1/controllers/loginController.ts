const loginWrapper = (adapters:any) => {
    const authentication = (request:any, reply:any) => {
      const payload = {
        ...request.payload,
      };
      return adapters.authentication({
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
      authentication,
    };
  };
  
  export = loginWrapper;
  
  