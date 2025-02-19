import _ from 'lodash';
import DataLoader from 'dataloader';

import { IFetchUsersUC } from '@/useCases/user';

const createUserLoaderById = (fetchUsersUC: IFetchUsersUC) =>
    new DataLoader(async (ids: readonly string[]) => {
        try {
            const usersData = await fetchUsersUC.execute({ id: Array.from(ids) });
            const userMap = _.keyBy(usersData, 'id');

            return _.map(ids, (id) => {
                if (userMap[id]) return userMap[id];
                return new Error(`User com id ${id} não foi encontrado - Loader`);
            }).filter(Boolean);
        } catch (error) {
            return _.map(ids, () => {
                if (error instanceof Error) return error;
                return new Error('Unknown error - Loader');
            });
        }
    });

export default { createUserLoaderById };