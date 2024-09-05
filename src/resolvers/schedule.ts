import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { BaseResolver } from "@/libs/baseResolver";

import { AllUserType } from '@/dtos/enums'
import { ScheduleInput, FetchScheduleInput } from "@/dtos/inputs";
import { ScheduleModel, ScheduleResponseModel, UserModelResponse } from "@/dtos/models";
import { FetchSchedulesUC, IFetchSchedulesUC, IStoreScheduleUC, StoreScheduleUC } from "@/useCases/schedule";
import { FetchUsersUC, IFetchUsersUC } from "@/useCases/user";
import { UsersResolver } from './user'

@Resolver(() => ScheduleResponseModel)
export class SchedulesResolver extends BaseResolver {
    private FetchSchedules: IFetchSchedulesUC
    private StoreSchedule: IStoreScheduleUC
    private FetchUsers: IFetchUsersUC
    private UsersResolver: UsersResolver

    constructor() {
        super();
        this.UsersResolver = new UsersResolver()
        this.FetchUsers = new FetchUsersUC(this.MongoDB)
        this.FetchSchedules = new FetchSchedulesUC(this.MongoDB)
        this.StoreSchedule = new StoreScheduleUC(this.FetchUsers, this.MongoDB)
    }

    @Query(() => [ScheduleResponseModel])
    async fetchSchedules(@Arg("data") data: FetchScheduleInput, @Ctx() context: any) {
        return this.PermissionsLib.validate({
            requiredPermissions: [AllUserType.customer, AllUserType.teacher],
            permissions: context.user.type,
            endPoint: context.endPoint,
            function: () => this.FetchSchedules.execute(data)
        })
    }

    @Mutation(() => ScheduleResponseModel)
    async storeSchedule(@Arg("data") data: ScheduleInput, @Ctx() context: any) {
        return this.PermissionsLib.validate({
            requiredPermissions: [AllUserType.teacher],
            permissions: context.user.type,
            endPoint: context.endPoint,
            function: () => this.StoreSchedule.execute(data)
        })
    }

    @FieldResolver(() => UserModelResponse)
    async customer(@Root() schedule: ScheduleModel, @Ctx() context: any) {
        return this.UsersResolver.LoaderById(schedule.customerId, context)
    }

    @FieldResolver(() => UserModelResponse)
    async teacher(@Root() schedule: ScheduleModel, @Ctx() context: any) {
        return this.UsersResolver.LoaderById(schedule.teacherId, context)
    }
}
