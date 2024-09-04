import _ from "lodash";
import { mongodb } from "@/libs";

import { UserModel } from "@/dtos/models";
import { IFetchUsersUC, IFetchUsersUCArgs, IFetchUsersUCResponse } from ".";

export class FetchUsersUC implements IFetchUsersUC {
    constructor(
        private MongoDB: typeof mongodb
    ) { }

    //TODO -> mover para o mongo
    async execute(data: IFetchUsersUCArgs): Promise<IFetchUsersUCResponse[]> {
        const query = _.reduce(data, (result, value, key) => {
            if (_.size(value)) { result.$and.push({ [key]: { $in: value } }) }
            return result
        }, { "$and": [] } as any)

        return await this.MongoDB.run({
            action: 'fetch',
            collection: 'users',
            data: query,
        }) as UserModel[]
    }
}
