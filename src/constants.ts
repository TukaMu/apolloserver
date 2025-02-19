import 'dotenv/config';

export default {
    hashgSalts: 10,
    token: {
        secretKey: process.env.secretKey || '',
        expiresIn: process.env.expiresIn || '3H',
    },
    mongodbURL: process.env.mongodbURL || ''
}