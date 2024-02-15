interface PokemonService {
    huntPokemon(): Promise<any>;
}

const pokemonService = ({
config,
request,
}: {
config: any;
request: any;
}): PokemonService => {
const {
    services: {
        pokemon: {
            host: baseURL,
            path,
        }
    },
} = config;
const huntPokemon = async (number = undefined) => {
    try {
    const queryString = number ? `/${number}` : '?offset=0&limit=600';
    const { data } = await request({
        method: 'GET',
        baseURL,
        url: `${path}${queryString}`,
    });
    return data;
    } catch (errorCatch:any) {
    const { status, data } = errorCatch?.response;
    throw {
        message: `Error on service pokemon ${baseURL}${path}. [${data.message || errorCatch.message}]`,
        statusCode: status || 500,
        errorCatch,
    };
    }
};
return { huntPokemon };
};
export = pokemonService;
