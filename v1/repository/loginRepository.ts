import connect from '../../common/mongodb';
import config from '../../config';

async function authentication(email: string, password: string): Promise<any> {
    try {
        const db = await connect();
        const collection = await db.collection(`${config.mongodb.collections.huntersCollection}`);
        const hunter = await collection.findOne({ email, password });
        return {
            id: hunter?._id,
            email: hunter?.email
        };
    } catch (error: any) {
        throw new Error(`Erro Login ${error.message}`);
    }
}

export default {
    authentication,
}