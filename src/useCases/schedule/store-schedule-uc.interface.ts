import { ScheduleInput } from "@/dtos/inputs";
import { ScheduleModel } from "@/dtos/models";

export interface IStoreScheduleUCArgs extends ScheduleInput { }

export type IStoreScheduleUCResponse = Promise<ScheduleModel>

export interface IStoreScheduleUC {
    execute(data: IStoreScheduleUCArgs): IStoreScheduleUCResponse
}