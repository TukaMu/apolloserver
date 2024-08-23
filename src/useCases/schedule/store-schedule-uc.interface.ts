import { ScheduleInput } from "../../dtos/inputs/schedule";
import { ScheduleModel } from "../../dtos/models/schedule";

export interface IStoreScheduleUCArgs extends ScheduleInput { }

export interface IStoreScheduleUCResponse extends ScheduleModel { }

export interface IStoreScheduleUC {
    execute(data: IStoreScheduleUCArgs): Promise<IStoreScheduleUCResponse>
}