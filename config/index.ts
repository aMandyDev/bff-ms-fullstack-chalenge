import * as dotenv from 'dotenv';

dotenv.config();

interface StripPrefix {
  path: string;
}

interface AppData {
  port: string | undefined;
  jwtTokenSecret: string | undefined;
}

interface ServicesData {
  pokemon: {
    host: string | undefined;
    path: string | undefined;
  };
}
interface MongoData {
  uri: string | undefined;
  base: string | undefined;
  collections: {
    huntersCollection: string | undefined;
    pokemonsCollection: string | undefined;
    whitelistCollection: string | undefined;
  }
}

class Config {
  data: {
    app: AppData;
    services: ServicesData;
    mongodb: MongoData;
    stripPrefix: StripPrefix;
  };

  constructor() {
    this.data = {
      app: this.getAppData(),
      services: this.getServicesData(),
      mongodb: this.getMongoData(),
      stripPrefix: this.stripPrefix(),
    };
  }

  private stripPrefix(): StripPrefix {
    return {
      path: `/api/${process.env.SERVICE_NAME!.replace(/-/g, '')}`,
    };
  }

  private getAppData(): AppData {
    return {
      port: process.env.PORT,
      jwtTokenSecret: process.env.JWT_TOKEN_SECRET,
    };
  }

  private getServicesData(): ServicesData {
    return {
      pokemon: {
        host: process.env.POKEMON_HOST,
        path: process.env.POKEMON_ROUTE,
      },
    };
  }
  private getMongoData(): MongoData {
    return {
      uri: process.env.MONGO_HOST,
      base: process.env.MONGO_DATABASE,
      collections: {
        huntersCollection: process.env.MONGO_COLLECTIONS_HUNTERS,
        pokemonsCollection: process.env.MONGO_COLLECTIONS_POKEMONS,
        whitelistCollection: process.env.MONGO_COLLECTIONS_WHITELIST,
      }
    };
  };
}

const instance = new Config().data;
Object.freeze(instance);

export = instance;
