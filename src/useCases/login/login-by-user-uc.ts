import hash from "../../libs/hash";
import token from "../../libs/token";

import { ILoginByUserUC, ILoginByUserUCArgs, ILoginByUserUCResponse } from "./login-by-user-uc.interface";
import { GetUserUC } from "../user/get-user-uc"

export class LoginByUserUC implements ILoginByUserUC {
    async execute(data: ILoginByUserUCArgs): Promise<ILoginByUserUCResponse> {
        const userData = await new GetUserUC().execute({
            login: data.login
        })

        if (!userData) {
            throw new Error(`Usuário com login ${data.login} não foi encontrado!`)
        }

        const validationPassword = await hash.validate({
            hash: userData.password,
            value: data.password
        })

        const tokenData = await token.create({
            login: userData.login,
            name: userData.name,
            type: userData.type
        })

        if (validationPassword) {
            return {
                token: tokenData,
                type: userData.type
            }
        }

        throw new Error(`Senha ou usuário inválido!`)
    }
}
