import { Arg, Ctx, Query, Resolver } from "type-graphql";
import permissions from '../libs/permissions'

import { AllUserType } from '../dtos/enums/user-type'
import { LoginInput } from "../dtos/inputs/login";
import { LoginModel } from "../dtos/models/login";
import { LoginByUserUC } from "../useCases/login/login-by-user-uc";

@Resolver(() => LoginModel)
export class LoginResolver {
    @Query(() => LoginModel)
    async loginByUser(@Arg("data") data: LoginInput, @Ctx() context: any) {
        return permissions.validate({
            requiredPermissions: [AllUserType.open],
            permissions: context.user.type,
            endPoint: context.endPoint,
            function: () => new LoginByUserUC().execute(data)
        })
    }
}
