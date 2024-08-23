import _ from "lodash";
import mongodb from "../../libs/mongodb";
import hash from "../../libs/hash";

import { IStoreUserUC, IStoreUserUCArgs, IStoreUserUCResponse } from "./store-user-uc.interface";
import { UserModel } from "../../dtos/models/user";
import { GetUserUC } from "./get-user-uc";

export class StoreUserUC implements IStoreUserUC {
    async execute(data: IStoreUserUCArgs): Promise<IStoreUserUCResponse> {
        const userData = await new GetUserUC().execute({
            login: data.login
        })

        if (userData) {
            throw new Error(`Usuário com login ${data.login} já existe!`)
        }

        const dataToStore = {
            ...data,
            password: await hash.create({ value: data.password }),
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const response = await mongodb.run({
            action: 'store',
            collection: 'users',
            data: dataToStore
        }) as UserModel

        return _.omit(response, 'password');
    }
}
