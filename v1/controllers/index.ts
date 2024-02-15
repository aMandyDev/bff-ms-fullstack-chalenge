import factory from './factory';
import services from '../../services';
import adapters from '../adapters';
import config from '../../config';
import {
  loginRepository,
  hunterRepository,
  whitelistRepository,
  pokemonRepository,
} from '../repository';

const controllers = factory(adapters({
  config,
  loginRepository,
  hunterRepository,
  whitelistRepository,
  pokemonRepository,
  services,
}));

export default controllers;
