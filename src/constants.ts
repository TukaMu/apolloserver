import 'dotenv/config';

export default {
    hashgSalts: 10,
    token: {
        secretKey: process.env.secretKey || '',
        expiresIn: process.env.expiresIn || '3h',
    },
    mongodbURL: process.env.mongodbURL || ''
}