import _ from 'lodash';
import { MongoClient } from 'mongodb'
import crypto from 'crypto'

import constants from '@/constants';

interface runParams {
    action: 'update' | 'store' | 'delete' | 'get' | 'fetch',
    collection: 'schedules' | 'customers' | 'users',
    data: object,
}

// async function listDatabases(client: MongoClient) {
//     const databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

class MongoDB {
    async run(params: runParams) {
        console.log(JSON.stringify(params, null, 4))

        const uri = constants.mongodbURL
        const client = new MongoClient(uri);

        try {
            await client.connect();
            const connection = client.db('gestor').collection(params.collection);

            if (params.action === 'store') {
                const data = {
                    ...params.data,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    id: crypto.randomBytes(16).toString('hex')
                }

                const response = await connection.insertOne(data);

                if (response.insertedId) {
                    return _.omit(data, '_id');;
                }

                throw new Error(`Falha ao armanezar na collection ${params.collection}`);
            }

            if (params.action === 'fetch') {
                const response = await connection.find(params.data).toArray();

                if (_.size(response)) {
                    return _.map(response, (item) => _.omit(item, '_id'));
                }

                return [];
            }

            if (params.action === 'get') {
                const response = await connection.findOne(params.data);

                if (response?._id) {
                    return _.omit(response, '_id');
                }

                return null;
            }
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
}

export default new MongoDB();