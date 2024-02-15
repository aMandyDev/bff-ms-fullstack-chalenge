import Boom from '@hapi/boom';
import { Pokemon } from '../../models';
import moment from "moment";

interface Services {
  pokemonService: {
    huntPokemon: {
      (number?:string): void
    },
  }
}
interface PokemonRepository {
  registerPokemon: {
    (pokemon:Pokemon): void
  },
  updatePokemon: {
    (hunterId: string, pokemonId: string, name: string): void
  },
  getPokemon: {
    (pokemonId: string): void
  },
  getPokemons: {
    (hunterId:string): void
  },
}
interface HunterRepository {
  getHunter: {
    (hunterId:string): void
  },
}

interface PokemonWrapper {
  putPokemon(options: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any>;
  huntPokemon(options: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any>;
  registerPokemon(options: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any>;
}

const pokemonWrapper = ({
  services,
  pokemonRepository,
  hunterRepository,
}: {
  services?: Services,
  pokemonRepository?: PokemonRepository,
  hunterRepository?: HunterRepository,
}): PokemonWrapper => {
  const huntPokemon = async ({
    payload,
    onSuccess,
    onError,
  }: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any> => {
    try {
      const { hunterId } = payload;
      const { results:pokemons }:any = await services?.pokemonService.huntPokemon();
      if (!pokemons.length) {
        throw Boom.expectationFailed('Error on pokeAPI');
      }
      const randomIndex = Math.floor(Math.random() * pokemons.length);
      const { name, url} = pokemons[randomIndex];
      const [,number] = url?.match(/\/(\d+)\/?$/);
      const pokemonsHunter:any = await pokemonRepository?.getPokemons(hunterId);

      if (pokemonsHunter.some((poke:any) => poke.number === number)) {
        throw Boom.expectationFailed('Você parece ser um caçador inexperiente');
      }
      const  pokemon:any = await services?.pokemonService.huntPokemon(number);
      const capturedPokemon = {
        name,
        number,
        height: pokemon?.height,
        weight: pokemon?.weight,
        image: pokemon?.sprites?.other?.home?.front_default,
        types: pokemon?.types?.map((type:any) => type.type.name),
        abilities: pokemon?.abilities?.map((ability:any) => ability.ability.name),
      }
      
      return onSuccess(capturedPokemon);
    } catch (errorCatch: any) {
      return onError(errorCatch);
    }
  };
  const registerPokemon = async ({
    payload,
    onSuccess,
    onError,
  }: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any> => {
    try {
      const { hunterId, name, number, height, weight, image, types, abilities } = payload;
      const hunter = await hunterRepository?.getHunter(hunterId);
      if (!hunter) {
        throw Boom.notFound('Caçador não encontrado');
      }
      const captured = moment().format('DD/MM/YYYY');
      const pokemon = new Pokemon(hunterId, name, number, height, weight, image,captured, types, abilities);
      const registre = await pokemonRepository?.registerPokemon(pokemon);
      return onSuccess(registre);
    } catch (errorCatch: any) {
      return onError(errorCatch);
    }
  };
  const putPokemon = async ({
    payload,
    onSuccess,
    onError,
  }: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any> => {
    try {
      const { hunterId, pokemonId, name } = payload;
      await pokemonRepository?.updatePokemon(hunterId, pokemonId, name);
      const pokemon = await pokemonRepository?.getPokemon(pokemonId);
      return onSuccess(pokemon);
    } catch (errorCatch: any) {
      return onError(errorCatch);
    }
  };

  return {
    putPokemon,
    huntPokemon,
    registerPokemon,
  };
};

export = pokemonWrapper;
