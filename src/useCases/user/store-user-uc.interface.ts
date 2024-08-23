import { UserModelResponse } from "../../dtos/models/user";
import { StoreUserInput } from "../../dtos/inputs/user";

export interface IStoreUserUCArgs extends StoreUserInput { }
export interface IStoreUserUCResponse extends UserModelResponse { }

export interface IStoreUserUC {
    execute(data: IStoreUserUCArgs): Promise<IStoreUserUCResponse>
}