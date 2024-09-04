import { hash, token } from "@/libs";

import { ILoginByUserUC, ILoginByUserUCArgs, ILoginByUserUCResponse } from ".";
import { IGetUserUC } from "@/useCases/user";

export class LoginByUserUC implements ILoginByUserUC {
    constructor(
        private GetUserUC: IGetUserUC,
        private HashLib: typeof hash,
        private TokenLib: typeof token
    ) { }

    async execute(data: ILoginByUserUCArgs): Promise<ILoginByUserUCResponse> {
        const userData = await this.GetUserUC.execute({
            login: data.login
        })

        if (!userData) {
            throw new Error(`Usuário com login ${data.login} não foi encontrado!`)
        }

        const validationPassword = await this.HashLib.validate({
            hash: userData.password,
            value: data.password
        })

        if (validationPassword) {
            const tokenData = await this.TokenLib.create({
                login: userData.login,
                name: userData.name,
                type: userData.type
            })

            return {
                token: tokenData,
                type: userData.type
            }
        }

        throw new Error(`Senha ou usuário inválido!`)
    }
}
