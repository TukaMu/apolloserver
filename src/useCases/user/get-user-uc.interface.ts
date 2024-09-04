import { ResponseNullABle } from "@/libs";

import { UserModel } from "@/dtos/models";

export interface IGetUserUCArgs {
    login?: string
    name?: string
    id?: string
}

export type IGetUserUCResponse = ResponseNullABle<UserModel>

export interface IGetUserUC {
    execute(data: IGetUserUCArgs): IGetUserUCResponse
}