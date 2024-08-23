import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import permissions from '../libs/permissions'

import { AllUserType } from '../dtos/enums/user-type'
import { ScheduleInput, FetchScheduleInput } from "../dtos/inputs/schedule";
import { ScheduleModel } from "../dtos/models/schedule";
import { FetchSchedulesUC } from "../useCases/schedule/fetch-schedules-uc";
import { StoreScheduleUC } from "../useCases/schedule/store-schedule-uc";
import { UserModelResponse } from "../dtos/models/user";
import { GetUserUC } from "../useCases/user/get-user-uc";

@Resolver(() => ScheduleModel)
export class SchedulesResolver {
    @Query(() => [ScheduleModel])
    async fetchSchedules(@Arg("data") data: FetchScheduleInput, @Ctx() context: any) {
        return permissions.validate({
            requiredPermissions: [AllUserType.customer, AllUserType.teacher],
            permissions: context.user.type,
            endPoint: context.endPoint,
            function: () => new FetchSchedulesUC().execute(data)
        })
    }

    @Mutation(() => ScheduleModel)
    async storeSchedule(@Arg("data") data: ScheduleInput, @Ctx() context: any) {
        return permissions.validate({
            requiredPermissions: [AllUserType.teacher],
            permissions: context.user.type,
            endPoint: context.endPoint,
            function: () => new StoreScheduleUC().execute(data)
        })
    }

    @FieldResolver(() => UserModelResponse)
    async customer(@Root() schedule: ScheduleModel) {
        return new GetUserUC().execute({
            id: schedule.customerId
        })
    }

    @FieldResolver(() => UserModelResponse)
    async teacher(@Root() schedule: ScheduleModel) {
        return new GetUserUC().execute({
            id: schedule.teacherId
        })
    }
}
