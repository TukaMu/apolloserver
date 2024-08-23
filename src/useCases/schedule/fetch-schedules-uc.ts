import mongodb from "../../libs/mongodb";
import { ScheduleModel } from "../../dtos/models/schedule";
import { IFetchSchedulesUC, IFetchSchedulesUCArgs, IFetchSchedulesUCResponse } from "./fetch-schedules-uc.interface";

export class FetchSchedulesUC implements IFetchSchedulesUC {
    async execute(data: IFetchSchedulesUCArgs): Promise<IFetchSchedulesUCResponse[]> {
        const response = await mongodb.run({
            action: 'fetch',
            collection: 'schedules',
            data
        }) as ScheduleModel[]

        return response
    }
}
