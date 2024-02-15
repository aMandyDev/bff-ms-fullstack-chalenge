import hunterWrapper from './hunter';
import loginWrapper from './login';
import pokemonWrapper from './pokemon';

export = (dependencies:any) => ({
  postWhitelist: hunterWrapper({
    whitelistRepository: dependencies.whitelistRepository,
  }).postWhitelist,
  getHunter: hunterWrapper({
    hunterRepository: dependencies.hunterRepository,
    pokemonRepository: dependencies.pokemonRepository,
  }).getHunter,
  hunterRegistration: hunterWrapper({
    hunterRepository: dependencies.hunterRepository,
    whitelistRepository: dependencies.whitelistRepository,
  }).hunterRegistration,
  authentication: loginWrapper({
    config: dependencies.config,
    loginRepository: dependencies.loginRepository,
  }).authentication,
  huntPokemon: pokemonWrapper({
    pokemonRepository: dependencies.pokemonRepository,
    services: dependencies.services,
  }).huntPokemon,
  registerPokemon: pokemonWrapper({
    services: dependencies.services,
    pokemonRepository: dependencies.pokemonRepository,
    hunterRepository: dependencies.hunterRepository,
  }).registerPokemon,
  putPokemon: pokemonWrapper({
    pokemonRepository: dependencies.pokemonRepository,
  }).putPokemon,
});
