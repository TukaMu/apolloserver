import { LoginModel } from "@/dtos/models";
import { LoginInput } from "@/dtos/inputs";

export interface ILoginByUserUCArgs extends LoginInput { }

export interface ILoginByUserUCResponse extends LoginModel { }

export interface ILoginByUserUC {
    execute(data: ILoginByUserUCArgs): Promise<ILoginByUserUCResponse>
}