import _ from "lodash";
import { hash, mongodb } from '@/libs'

import { UserModel } from "@/dtos/models";
import { IGetUserUC, IStoreUserUC, IStoreUserUCArgs, IStoreUserUCResponse } from ".";

export class StoreUserUC implements IStoreUserUC {
    constructor(
        private GetUserUC: IGetUserUC,
        private HashLib: typeof hash,
        private MongoDB: typeof mongodb
    ) { }

    async execute(data: IStoreUserUCArgs): IStoreUserUCResponse {
        const userData = await this.GetUserUC.execute({
            login: data.login
        })

        if (userData) {
            throw new Error(`Usuário com login ${data.login} já existe!`)
        }

        const password = await this.HashLib.create({ value: data.password });

        const response = await this.MongoDB.run({
            action: 'store',
            collection: 'users',
            data: {
                ...data,
                password
            }
        }) as UserModel

        return _.omit(response, 'password');
    }
}
