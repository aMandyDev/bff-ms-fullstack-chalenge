import connect from '../../common/mongodb';
import { Whitelist } from '../models';
import config from '../../config';

async function createEmailWhitelist(whitelist: Whitelist): Promise<any> {
    try {
        const db = await connect();
        const collection = await db.collection(`${config.mongodb.collections.whitelistCollection}`);
        collection.createIndex({ 'email': 1 }, { unique: true });
        return await collection.insertOne({ ...whitelist});
    } catch (error:any) {
        throw new Error(`Erro ao cadastrar email${error.message}`);
    }
}
async function getEmailWhitelist(email: string): Promise<any> {
    try {
        const db = await connect();
        const collection = await db.collection(`${config.mongodb.collections.whitelistCollection}`);
        return await collection.findOne({ email }, {  projection: { _id: 0 } });
    } catch (error:any) {
        throw new Error(`Erro ao consultar email em whitelist${error.message}`);
    }
}
export default {
    createEmailWhitelist,
    getEmailWhitelist,
}