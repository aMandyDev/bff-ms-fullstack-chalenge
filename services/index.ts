import axios from 'axios';
import config from '../config';
import factory from './factory';

const dependencies = {
    config,
    request: axios,
}

export = factory(dependencies);