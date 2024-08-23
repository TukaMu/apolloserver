import mongodb from "../../libs/mongodb";

import { IFetchUsersUC, IFetchUsersUCArgs, IFetchUsersUCResponse } from "./fetch-users-uc.interface";
import { UserModel } from "../../dtos/models/user";
import _ from "lodash";

export class FetchUsersUC implements IFetchUsersUC {
    //TODO -> mover para o mongo
    async execute(data: IFetchUsersUCArgs): Promise<IFetchUsersUCResponse[]> {
        const query = _.reduce(data, (result, value, key) => {
            if (_.size(value)) { result.$and.push({ [key]: { $in: value } }) }
            return result
        }, { "$and": [] } as any)

        const response = await mongodb.run({
            action: 'fetch',
            collection: 'users',
            data: query,
        }) as UserModel[]

        return response;
    }
}
