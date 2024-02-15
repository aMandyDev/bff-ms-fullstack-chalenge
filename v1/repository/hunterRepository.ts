import { ObjectId } from "mongodb";
import connect from '../../common/mongodb';
import { Hunter } from '../models';
import config from '../../config';

async function hunterRegistration(hunter: Hunter): Promise<any> {
    try {
        const db = await connect();
        const collection = await db.collection(`${config.mongodb.collections.huntersCollection}`);
        collection.createIndex({ 'email': 1 }, { unique: true });
        const result: any = await collection.insertOne({ ...hunter });
        return result;
    } catch (error:any) {
        throw new Error(`Erro ao cadastrar caçador${error.message}`);
    }
}
async function getHunter(hunterId: string): Promise<any> {
    try {
        const db = await connect();
        const collection = await db.collection(`${config.mongodb.collections.huntersCollection}`);
        const result = await collection.findOne({ _id: new ObjectId(hunterId) });
        return result;
    } catch (error: any) {
        console.log('Error getHunter', error.message);
       return null;
    }
}

export default {
    getHunter,
    hunterRegistration,
}