import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { BaseResolver } from "@/libs/baseResolver";

import { AllUserType } from '@/dtos/enums'
import { LoginInput } from "@/dtos/inputs";
import { LoginModel } from "@/dtos/models";
import { ILoginByUserUC, LoginByUserUC } from "@/useCases/login";
import { IGetUserUC, GetUserUC } from "@/useCases/user";

@Resolver(() => LoginModel)
export class LoginResolver extends BaseResolver {
    private GetUser: IGetUserUC
    private LoginByUser: ILoginByUserUC

    constructor() {
        super();
        this.GetUser = new GetUserUC(this.MongoDB)
        this.LoginByUser = new LoginByUserUC(this.GetUser, this.HashLib, this.TokenLib)
    }

    @Query(() => LoginModel)
    async loginByUser(@Arg("data") data: LoginInput, @Ctx() context: any) {
        return this.PermissionsLib.validate({
            requiredPermissions: [AllUserType.open],
            permissions: context.user.type,
            endPoint: context.endPoint,
            function: () => this.LoginByUser.execute(data)
        });
    }
}
