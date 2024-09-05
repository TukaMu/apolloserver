import _ from 'lodash';
import DataLoader from 'dataloader';
import { IFetchUsersUC } from '@/useCases/user';

const createUserLoaderById = (fetchUsersUC: IFetchUsersUC) =>
    new DataLoader(async (ids: readonly string[]) => {
        try {
            const usersData = await fetchUsersUC.execute({ id: Array.from(ids) });
            const userMap = _.keyBy(usersData, 'id');
            return Array.from(ids).map(id => userMap[id] || new Error(`User with id ${id} not found`));
        } catch (error) {
            return Array.from(ids).map(() => error instanceof Error ? error : new Error('Unknown error'));
        }
    });

export default { createUserLoaderById };