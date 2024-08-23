import { UserModel } from "../../dtos/models/user";

export interface IFetchUsersUCArgs {
    login?: string[]
    name?: string[]
    id?: string[]
}
export interface IFetchUsersUCResponse extends UserModel { }

export interface IFetchUsersUC {
    execute(data: IFetchUsersUCArgs): Promise<IFetchUsersUCResponse[]>
}