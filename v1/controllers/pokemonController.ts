const pokemonWrapper = (adapters:any) => {
  const putPokemon = (request:any, reply:any) => adapters.putPokemon({
    payload:{
      ...request.query,
      ...request.payload,
    },
    headers: {
      ...request.headers,
    },
    onSuccess: (data:any) => reply.response(data).code(200),
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
  const huntPokemon = (request:any, reply:any) => adapters.huntPokemon({
    payload: {
      ...request.query,
    },
    headers: {
      ...request.headers,
    },
    onSuccess: (data:any) => reply.response(data).code(200),
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
  const registerPokemon = (request:any, reply:any) => {
    const payload = {
      ...request.query,
      ...request.payload,
    };
    return adapters.registerPokemon({
      payload,
      headers: {
        ...request.headers,
      },
      onSuccess: (data:any) => reply.response(data).code(200),
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
    putPokemon,
    huntPokemon,
    registerPokemon,
  };
};

export default pokemonWrapper;

