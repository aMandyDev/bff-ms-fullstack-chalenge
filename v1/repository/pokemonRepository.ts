import { ObjectId } from "mongodb";
import connect from '../../common/mongodb';
import config from '../../config';
import { Pokemon } from '../models';

async function updatePokemon(hunterId: string, pokemonId: string, name: string): Promise<any> {
    try {
        const db = await connect();
        const collection = await db.collection(`${config.mongodb.collections.pokemonsCollection}`);
        const result: any = await collection.updateOne({ _id: new ObjectId(pokemonId), hunterId }, { "$set": { name } });
        return result;
    } catch (error: any) {
        throw new Error(`Erro ao editar pokemon${error.message}`);
    }
}
async function registerPokemon(pokemon: Pokemon): Promise<any> {
    try {
        const db = await connect();
        const collection = await db.collection(`${config.mongodb.collections.pokemonsCollection}`);
        collection.createIndex({ 'number': 1 }, { unique: true });
        const result: any = await collection.insertOne({ ...pokemon });
        return result;
    } catch (error: any) {
        throw new Error(`Erro ao cadastrar pokemon${error.message}`);
    }
}
async function getPokemons(hunterId: string): Promise<any> {
    try {
        const db = await connect();
        const collection = await db.collection(`${config.mongodb.collections.pokemonsCollection}`);
        const results = await collection.find({ hunterId });
        return results.toArray();
    } catch (error: any) {
        throw new Error(`Erro Login ${error.message}`);
    }
}
async function getPokemon(pokemonId: string): Promise<any> {
    try {
        const db = await connect();
        const collection = await db.collection(`${config.mongodb.collections.pokemonsCollection}`);
        const result = await collection.findOne({ _id: new ObjectId(pokemonId) });
        return result;
    } catch (error: any) {
        throw new Error(`Erro Login ${error.message}`);
    }
}
export default {
    updatePokemon,
    getPokemons,
    getPokemon,
    registerPokemon,
}