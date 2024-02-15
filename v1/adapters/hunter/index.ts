import Boom from '@hapi/boom'
import crypto from "crypto";
import { Hunter, Whitelist } from '../../models';

interface PokemonRepository {
  getPokemons: {
    (hunterId:string): void
  },
}
interface HunterRepository {
  hunterRegistration: {
    (hunter: Hunter): void
  },
  getHunter: {
    (hunterId: string): void
  },
}
interface WhitelistRepository {
  getEmailWhitelist: {
    (email: string): void
  },
  createEmailWhitelist: {
    (whitelist: Whitelist): void
  },
}
interface HunterWrapper {
  postWhitelist(options: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any>;
  getHunter(options: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any>;
  hunterRegistration(options: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any>;
}
const fullStackChalengeWrapper = ({
  pokemonRepository,
  hunterRepository,
  whitelistRepository,
}: {
  hunterRepository?: HunterRepository,
  whitelistRepository?: WhitelistRepository,
  pokemonRepository?: PokemonRepository,
}): HunterWrapper => {
  const postWhitelist = async ({
    payload,
    headers,
    onSuccess,
    onError,
  }: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any> => {
    try {
      const { email } = payload;
      const newWhitelist = new Whitelist(email);
      await whitelistRepository?.createEmailWhitelist(newWhitelist);
      return onSuccess({ message: 'OK'});
    } catch (errorCatch: any) {
      return onError(errorCatch);
    }
  };
  const hunterRegistration = async ({
    payload,
    headers,
    onSuccess,
    onError,
  }: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any> => {
    try {
      const { name, email, password, address } = payload;
      const hashPassword = crypto.createHash('md5').update(password).digest("hex");
      // const newWhitelist = new Whitelist(email);
      // await whitelistRepository?.createEmailWhitelist(newWhitelist);
      const whitelist:any = await whitelistRepository?.getEmailWhitelist(email);
      if (!whitelist) {
        throw Boom.unauthorized("Você não está autorizado, entre em contato com o administrador");
      }
      const hunter = new Hunter(name, email, hashPassword, address);
      const response = await hunterRepository?.hunterRegistration(hunter)
      return onSuccess(response);
    } catch (errorCatch: any) {
      return onError(errorCatch);
    }
  };
  const getHunter = async ({
    payload,
    headers,
    onSuccess,
    onError,
  }: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: { message: string; statusCode: number; errorCatch: any }) => any;
  }): Promise<any> => {
    try {
      const { hunterId } = payload;
      const hunter:any = await hunterRepository?.getHunter(hunterId);
      const pokemons:any = await pokemonRepository?.getPokemons(hunterId);
      return onSuccess({
        name: hunter?.name,
        email: hunter?.email,
        address: hunter?.address,
        pokemons,
      });
    } catch (errorCatch: any) {
      return onError(errorCatch);
    }
  };
  return {
    getHunter,
    postWhitelist,
    hunterRegistration,
  };
};

export = fullStackChalengeWrapper;
