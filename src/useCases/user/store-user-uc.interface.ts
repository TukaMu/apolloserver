import { UserModelResponse } from "@/dtos/models";
import { StoreUserInput } from "@/dtos/inputs";

export interface IStoreUserUCArgs extends StoreUserInput { }
export type IStoreUserUCResponse = Promise<UserModelResponse>

export interface IStoreUserUC {
    execute(data: IStoreUserUCArgs): IStoreUserUCResponse
}