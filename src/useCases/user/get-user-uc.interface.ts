import { UserModel } from "../../dtos/models/user";

export interface IGetUserUCArgs {
    login?: string
    name?: string
    id?: string
}
export interface IGetUserUCResponse extends UserModel { }

export interface IGetUserUC {
    execute(data: IGetUserUCArgs): Promise<IGetUserUCResponse>
}