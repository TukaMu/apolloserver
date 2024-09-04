import { mongodb } from "@/libs";

import { ScheduleModel } from "@/dtos/models";
import { IFetchSchedulesUC, IFetchSchedulesUCArgs, IFetchSchedulesUCResponse } from ".";

export class FetchSchedulesUC implements IFetchSchedulesUC {
    constructor(
        private MongoDB: typeof mongodb,
    ) { }

    async execute(data: IFetchSchedulesUCArgs): IFetchSchedulesUCResponse {
        return await this.MongoDB.run({
            action: 'fetch',
            collection: 'schedules',
            data
        }) as ScheduleModel[]
    }
}
