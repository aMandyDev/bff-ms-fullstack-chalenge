import Hapi from '@hapi/hapi';
import Joi from 'joi';
import {
  registerSwaggerPlugin,
} from '../swagger';
import config from '../config';
import routes from './routes';

const init = async () => {
  const server = Hapi.server({
    port: config.app.port, router: { isCaseSensitive: false }, routes: {
      cors: true
    }
  });
  server.validator(Joi);
  server.realm.modifiers.route.prefix = config.stripPrefix.path;
  server.route(routes);
  await registerSwaggerPlugin(server);
  await server.start();
  console.info({
    message: `App running on ${server.info.protocol}://${server.info.host}:${server.info.port}${config.stripPrefix.path}/docs`,
  });

};

init();
