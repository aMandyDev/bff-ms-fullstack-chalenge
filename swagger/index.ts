import Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import config from '../config'
import { version } from '../package.json';

const { stripPrefix: { path } } = config;


const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: 'API Documentation',
    version,
  },
  documentationPath: '/docs',
  basePath: path,
};

export const registerSwaggerPlugin = async (server: Hapi.Server) => {
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
};

export const healthcheck =  {
  method: 'GET',
  path: '/healthcheck',
  handler: () => `Server version: ${version}`
}
