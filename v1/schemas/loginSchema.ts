import Joi from 'joi'

const loginSchema = {
    request: {
        login: {
            headers: {
                
                
            },
            payload: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),

            })
        }
    }
}
export = loginSchema;