import _ from "lodash";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import permissions from '../libs/permissions'

import { StoreUserInput } from '../dtos/inputs/user'
import { UserModel, UserModelResponse } from "../dtos/models/user";
import { StoreUserUC } from "../useCases/user/store-user-uc";

@Resolver(() => UserModel)
export class UsersResolver {
    @Mutation(() => UserModelResponse)
    async storeUser(@Arg("data") data: StoreUserInput, @Ctx() context: any) {
        return permissions.validate({
            requiredPermissions: [],
            permissions: context.user.type,
            endPoint: context.endPoint,
            function: () => new StoreUserUC().execute(data)
        })
    }
}
