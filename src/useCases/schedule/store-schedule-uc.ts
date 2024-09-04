import _ from "lodash";
import { mongodb } from "@/libs";
import { AllUserType } from "@/dtos/enums";
import { ScheduleModel } from "@/dtos/models";

import { IStoreScheduleUC, IStoreScheduleUCArgs, IStoreScheduleUCResponse } from ".";
import { IFetchUsersUC } from "@/useCases/user";

export class StoreScheduleUC implements IStoreScheduleUC {
    constructor(
        private FetchUsers: IFetchUsersUC,
        private MongoDB: typeof mongodb,
    ) { }

    async execute(data: IStoreScheduleUCArgs): IStoreScheduleUCResponse {
        if (data.customerId === data.teacherId) {
            throw new Error('Os dois usuários são iguas!')
        }

        const users = await this.FetchUsers.execute({
            id: [data.customerId, data.teacherId],
        })

        const userCustomer = _.find(users, { id: data.customerId })
        const userTeacher = _.find(users, { id: data.teacherId })

        if (!userCustomer || !userTeacher) {
            throw new Error('Algum usuário não foi encontrado!')
        }

        if (
            !_.size(_.intersection(userCustomer.type, [AllUserType.customer, AllUserType.root])) ||
            !_.size(_.intersection(userTeacher.type, [AllUserType.teacher, AllUserType.root]))) {
            throw new Error('Algum usuário não possui um cargo válido!')
        }

        return await this.MongoDB.run({
            action: 'store',
            collection: 'schedules',
            data
        }) as ScheduleModel;
    }
}