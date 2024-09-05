import _ from "lodash";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { BaseResolver } from "@/libs/baseResolver";

import { StoreUserInput } from '@/dtos/inputs'
import { UserModel, UserModelResponse } from "@/dtos/models";
import { GetUserUC, IGetUserUC, IStoreUserUC, StoreUserUC } from "@/useCases/user";

@Resolver(() => UserModel)
export class UsersResolver extends BaseResolver {
    private GetUser: IGetUserUC
    private StoreUser: IStoreUserUC

    constructor() {
        super();
        this.GetUser = new GetUserUC(this.MongoDB)
        this.StoreUser = new StoreUserUC(this.GetUser, this.HashLib, this.MongoDB)
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

    async LoaderById(@Arg("id") id: string, @Ctx() context: any) {
        const { userLoader } = context.loaders;

        const user = await userLoader.load(id);

        if (user instanceof Error) {
            throw new Error(user.message);
        }

        return user;
    }
}
