import _ from "lodash";
import mongodb from "../../libs/mongodb";
import { ScheduleModel } from "../../dtos/models/schedule";
import { IStoreScheduleUC, IStoreScheduleUCArgs, IStoreScheduleUCResponse } from "./store-schedule-uc.interface";
import { FetchUsersUC } from "../user/fetch-users-uc";
import { AllUserType } from "../../dtos/enums/user-type";

export class StoreScheduleUC implements IStoreScheduleUC {
    async execute(data: IStoreScheduleUCArgs): Promise<IStoreScheduleUCResponse> {
        if (data.customerId === data.teacherId) {
            throw new Error('Os dois usuários são iguas!')
        }

        const users = await new FetchUsersUC().execute({
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

        const dataToStore = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const response = await mongodb.run({
            action: 'store',
            collection: 'schedules',
            data: dataToStore
        }) as ScheduleModel;

        return response
    }
}