import Joi from 'joi'
const name = Joi.string().required();
const hunterId = Joi.string().required();
const pokemonSchema = {
    request: {
        registerPokemon: {
            headers: {
                'authorization': Joi.string().required(),
            },
            query: {
                hunterId,
            },
            payload: Joi.object({
                name,
                number: Joi.string().required(),
                height: Joi.number().required(),
                weight: Joi.number().required(),
                image: Joi.string().required(),
                types: Joi.array().items(name).required(),
                abilities: Joi.array().items(name).required(),
            }),
        },
        putPokemon: {
            headers: {
                'authorization': Joi.string().required(),
            },
            query: {
                hunterId,
            },
            payload: Joi.object({
                name,
                pokemonId: Joi.string().required(),
            }),
        }
    }
}
export = pokemonSchema;