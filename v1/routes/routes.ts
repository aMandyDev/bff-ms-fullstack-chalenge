import controllers from '../controllers';
import middlewares from '../../middlewares'
import {
  hunterSchema,
  loginSchema,
  pokemonSchema,
  whitelistSchema,
} from '../schemas';

interface RouteConfig {
  description: string;
  tags: string[];
  pre?: any;
  handler: any;
  validate: any;
}

interface Route {
  method: string;
  path: string;
  options: RouteConfig;
}

const hunterRegistration: Route = {
  method: 'post',
  path: '/v1/fullStackChalenge/hunter/registration',
  options: {
    description: 'Registra um novo caçador',
    tags: ['api'],
    handler: controllers.hunterRegistration,
    validate: {
      options: {
        allowUnknown: true,
      },
      headers: hunterSchema.request.hunterRegistration.headers,
      payload: hunterSchema.request.hunterRegistration.payload,
    },
  },
};

const getHunter: Route = {
  method: 'GET',
  path: '/v1/fullStackChalenge/hunter',
  options: {
    description: 'Consulta caçador por id',
    tags: ['api'],
    pre: [{ method: middlewares.validateToken }],
    handler: controllers.getHunter,
    validate: {
      options: {
        allowUnknown: true,
      },
      headers: hunterSchema.request.hunter.headers,
      query: hunterSchema.request.hunter.query,
    },
  },
};

const authentication: Route = {
  method: 'post',
  path: '/v1/fullStackChalenge/authentication',
  options: {
    description: 'Login',
    tags: ['api'],
    handler: controllers.authentication,
    validate: {
      options: {
        allowUnknown: true,
      },
      headers: loginSchema.request.login.headers,
      payload: loginSchema.request.login.payload,
    },
  },
};

const huntPokemon: Route = {
  method: 'GET',
  path: '/v1/fullStackChalenge/pokemon/hunt',
  options: {
    description: 'Caça Pokémon',
    tags: ['api'],
    pre: [{ method: middlewares.validateToken }],
    handler: controllers.huntPokemon,
    validate: {
      options: {
        allowUnknown: true,
      },
      headers: pokemonSchema.request.registerPokemon.headers,
      query: pokemonSchema.request.registerPokemon.query,
    },
  },
};
const registerPokemon: Route = {
  method: 'POST',
  path: '/v1/fullStackChalenge/pokemon/register',
  options: {
    description: 'Registra pokemon',
    tags: ['api'],
    pre: [{ method: middlewares.validateToken }],
    handler: controllers.registerPokemon,
    validate: {
      options: {
        allowUnknown: true,
      },
      headers: pokemonSchema.request.registerPokemon.headers,
      payload: pokemonSchema.request.registerPokemon.payload,
      query: pokemonSchema.request.registerPokemon.query
    },
  },
};
const putPokemon: Route = {
  method: 'PUT',
  path: '/v1/fullStackChalenge/pokemon',
  options: {
    description: 'Edita um pokemon',
    tags: ['api'],
    pre: [{ method: middlewares.validateToken }],
    handler: controllers.putPokemon,
    validate: {
      options: {
        allowUnknown: true,
      },
      headers: pokemonSchema.request.putPokemon.headers,
      payload: pokemonSchema.request.putPokemon.payload,
      query: pokemonSchema.request.putPokemon.query
    },
  },
};
const postWhiteList: Route = {
  method: 'post',
  path: '/v1/fullStackChalenge/whitelist/email',
  options: {
    description: 'Cencede acesso ao email do caçador',
    tags: ['api'],
    handler: controllers.postWhitelist,
    validate: {
      options: {
        allowUnknown: true,
      },
      payload: whitelistSchema.request.whitelist.payload,
    },
  },
};

export {
  putPokemon,
  getHunter,
  huntPokemon,
  postWhiteList,
  registerPokemon,
  hunterRegistration,
  authentication,
};
