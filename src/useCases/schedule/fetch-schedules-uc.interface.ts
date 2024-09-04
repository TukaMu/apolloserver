import { FetchScheduleInput } from "@/dtos/inputs";
import { ScheduleModel } from "@/dtos/models";

export interface IFetchSchedulesUCArgs extends FetchScheduleInput { }

export type IFetchSchedulesUCResponse = Promise<ScheduleModel[]>

export interface IFetchSchedulesUC {
    execute(data: IFetchSchedulesUCArgs): IFetchSchedulesUCResponse
}