import mongodb from "../../libs/mongodb";

import { IGetUserUC, IGetUserUCArgs, IGetUserUCResponse } from "./get-user-uc.interface";
import { UserModel } from "../../dtos/models/user";

export class GetUserUC implements IGetUserUC {
    async execute(data: IGetUserUCArgs): Promise<IGetUserUCResponse> {
        return await mongodb.run({
            action: 'get',
            collection: 'users',
            data,
            nullable: true
        }) as UserModel
    }
}
