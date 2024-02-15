import hunterController from './hunterController';
import loginController from './loginController';
import pokemonController from './pokemonController';

export = (adapters:any) => ({
  getHunter: hunterController(
    adapters,
  ).getHunter,
  postWhitelist: hunterController(
    adapters,
  ).postWhitelist,
  hunterRegistration: hunterController(
    adapters,
  ).hunterRegistration,
  authentication: loginController(
    adapters,
  ).authentication,
  huntPokemon: pokemonController(
    adapters,
  ).huntPokemon,
  registerPokemon: pokemonController(
    adapters,
  ).registerPokemon,
  putPokemon: pokemonController(
    adapters,
  ).putPokemon,
});
