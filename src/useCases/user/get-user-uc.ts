import { mongodb } from "@/libs";

import { UserModel } from "@/dtos/models";
import { IGetUserUC, IGetUserUCArgs, IGetUserUCResponse } from ".";

export class GetUserUC implements IGetUserUC {
    constructor(
        private MongoDB: typeof mongodb
    ) { }

    async execute(data: IGetUserUCArgs): IGetUserUCResponse {
        return await this.MongoDB.run({
            action: 'get',
            collection: 'users',
            data,
        }) as UserModel
    }
}
