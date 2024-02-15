import Joi from 'joi'

const pokemonSchema = {
    request: {
        whitelist: {
            payload: Joi.object({
                email: Joi.string().required(),
            }),
        }
    }
}
export = pokemonSchema;