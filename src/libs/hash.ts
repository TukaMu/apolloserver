import bcrypt from 'bcrypt';

import constants from '@/constants';

interface createParams {
    value: string
}
interface validateParams {
    value: string
    hash: string
}

class Hash {
    async create(params: createParams) {
        try {
            const hash = await bcrypt.hash(params.value, constants.hashgSalts);

            return hash;
        } catch (err) {
            throw new Error(`Falha ao criar o hash!`);
        }
    }

    async validate(params: validateParams) {
        try {
            const equal = await bcrypt.compare(params.value, params.hash);

            return equal;
        } catch (err) {
            throw new Error(`Falha ao comprara o hash!`);
        }
    }
}

export default new Hash();