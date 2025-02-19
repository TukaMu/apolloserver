import { DataSource } from 'typeorm';
import constants from '@/constants'
import { Users, Schedules } from '@/entities';
import { ScheduleModel, UserModel } from '@/dtos/models';
import { ObjectId } from 'mongodb';

const AppDataSource = new DataSource({
    type: 'mongodb',
    url: constants.mongodbURL,
    synchronize: true,
    logging: true,
    entities: [Users, Schedules],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
});

type collection = 'schedules' | 'users';

const collectionAndEntities = {
    'users': { repository: Users, model: UserModel },
    'schedules': { repository: Schedules, model: ScheduleModel },
}

interface runParams {
    action: 'update' | 'store' | 'delete' | 'get' | 'fetch',
    collection: collection,
    data: object,
}

function replaceIdOrUnderscoreId(data: any, to: 'id' | '_id', newObjectId?: boolean): any {
    if (Array.isArray(data)) {
        return data.map(item => newObjectId && typeof item === 'string' ? new ObjectId(item) : replaceIdOrUnderscoreId(item, to, newObjectId));
    } else if (data !== null && typeof data === 'object') {
        if (data instanceof Date) {
            return data;
        }
        const correctId = to === 'id' ? '_id' : 'id';
        const newData: { [key: string]: any } = {};
        for (const key in data) {
            const value = data[key];
            if (data.hasOwnProperty(key)) {
                if (key === correctId) {
                    if (typeof value === 'string' && to === '_id') {
                        newData[to] = new ObjectId(value)
                    } else if (value instanceof ObjectId) {
                        newData[to] = value.toString();
                    } else {
                        newData[to] = to === '_id' ? replaceIdOrUnderscoreId(value, to, true) : value;
                    }
                } else {
                    newData[key] = replaceIdOrUnderscoreId(value, to, newObjectId);
                }
            }
        }
        return newData;
    }
    return data;
}

class MongoDB {
    async run(params: runParams) {
        params.data = await replaceIdOrUnderscoreId(params.data, '_id');

        await AppDataSource.initialize();
        const collectionEntity = collectionAndEntities[params.collection];
        const repository = AppDataSource.getMongoRepository(collectionEntity.repository);

        try {
            if (params.action === 'store') {
                const data = repository.create({
                    ...params.data,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                const response = await repository.save(data);

                if (response) {
                    const res = new collectionEntity.model()
                    Object.assign(res, replaceIdOrUnderscoreId(response, 'id'))
                    return res;
                }

                throw new Error(`Falha ao armazenar na collection ${params.collection}`);
            }

            if (params.action === 'fetch') {
                const response = await repository.find(params.data);

                if (response.length) {
                    return response.map(item => {
                        const res = new collectionEntity.model();
                        Object.assign(res, replaceIdOrUnderscoreId(item, 'id'));
                        return res;
                    });
                }

                return [];
            }

            if (params.action === 'get') {
                const response = await repository.findOne(params.data);

                if (response) {
                    const res = new collectionEntity.model()
                    Object.assign(res, replaceIdOrUnderscoreId(response, 'id'))
                    return res;
                }

                return null;
            }
        } catch (e) {
            console.error(e);
        } finally {
            await AppDataSource.destroy();
        }
    }
}

export default new MongoDB();