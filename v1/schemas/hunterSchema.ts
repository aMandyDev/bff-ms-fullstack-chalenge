import Joi from 'joi'

const hunterSchema = {
    request: {
        hunterRegistration: {
            headers: {
                
                
            },
            payload: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                address: Joi.object({
                    street: Joi.string().required(),
                    number: Joi.string().required(),
                    neighborhood: Joi.string().required(),
                    city: Joi.string().required(),
                    state: Joi.string().required(),
                })
            })
        },
        hunter:{
            headers: {
                'authorization': Joi.string().required(),
                
                
            },
            query: {
                hunterId: Joi.string().required(),
            }
        },
    }
}
export = hunterSchema;