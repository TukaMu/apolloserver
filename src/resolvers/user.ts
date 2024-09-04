import _ from "lodash";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { BaseResolver } from "@/libs/baseResolver";

import { StoreUserInput } from '@/dtos/inputs'
import { UserModel, UserModelResponse } from "@/dtos/models";
import { GetUserUC, IGetUserUC, IStoreUserUC, StoreUserUC } from "@/useCases/user";

@Resolver(() => UserModel)
export class UsersResolver extends BaseResolver {
    constructor(
        private GetUser: IGetUserUC,
        private StoreUser: IStoreUserUC,
    ) {
        super();
        this.GetUser = new GetUserUC(
            this.MongoDB
        )
        this.StoreUser = new StoreUserUC(
            this.GetUser,
            this.HashLib,
            this.MongoDB
        )
    }

    @Mutation(() => UserModelResponse)
    async storeUser(@Arg("data") data: StoreUserInput, @Ctx() context: any) {
        return this.PermissionsLib.validate({
            requiredPermissions: [],
            permissions: context.user.type,
            endPoint: context.endPoint,
            function: () => this.StoreUser.execute(data)
        })
    }
}
