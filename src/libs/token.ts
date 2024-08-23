import jwt from 'jsonwebtoken';
import constants from '../constants';

interface createParams {
    name: string
    login: string
    type: string[]
}
interface validateParams {
    token: string
}

async function create(params: createParams) {
    try {
        return jwt.sign(params, constants.token.secretKey, { expiresIn: constants.token.expiresIn });
    } catch (err) {
        throw new Error('Erro ao criar o token!');
    }
}

async function validate(params: validateParams) {
    try {
        return jwt.verify(params.token, constants.token.secretKey);
    } catch (err) {
        throw new Error('Erro ao validar o token!');
    }
}

export default {
    create,
    validate
}