import { LoginModel } from "../../dtos/models/login";
import { LoginInput } from "../../dtos/inputs/login";

export interface ILoginByUserUCArgs extends LoginInput { }

export interface ILoginByUserUCResponse extends LoginModel { }

export interface ILoginByUserUC {
    execute(data: ILoginByUserUCArgs): Promise<ILoginByUserUCResponse>
}