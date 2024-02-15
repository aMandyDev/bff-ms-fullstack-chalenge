import {
    Db,
    MongoClient
} from "mongodb";
import config from '../../config';

let singleton: Db;

export default async (): Promise<Db> => {
    if (singleton) return singleton;
    const client = new MongoClient(`${config.mongodb.uri}`);
    await client.connect();
    singleton = client.db(config.mongodb.base);
    return singleton;
}