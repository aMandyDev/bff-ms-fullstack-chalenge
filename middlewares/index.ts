import jwt from 'jwt-simple';
import Boom from '@hapi/boom';
import config from '../config'

const validateToken = async (request:any) => {
    try {
        const { authorization } = request.headers;
        const { hunterId } = request.query;
        const key = `${config.app.jwtTokenSecret}`;
        const hunter = await jwt.decode(authorization, key);
        if (hunter && hunter.id === hunterId) {
            return true;
        }
        throw Boom.forbidden(`Token invalido`);
    } catch (error: any) {
        throw Boom.forbidden(`Token invalido. ${error.message}`);
        
    }
}

export default { validateToken };