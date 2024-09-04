import { UserModel } from "@/dtos/models";

export interface IFetchUsersUCArgs {
    login?: string[]
    name?: string[]
    id?: string[]
}
export interface IFetchUsersUCResponse extends UserModel { }

export interface IFetchUsersUC {
    execute(data: IFetchUsersUCArgs): Promise<IFetchUsersUCResponse[]>
}