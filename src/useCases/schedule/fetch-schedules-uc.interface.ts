import { FetchScheduleInput } from "../../dtos/inputs/schedule";
import { ScheduleModel } from "../../dtos/models/schedule";

export interface IFetchSchedulesUCArgs extends FetchScheduleInput { }

export interface IFetchSchedulesUCResponse extends ScheduleModel { }

export interface IFetchSchedulesUC {
    execute(data: IFetchSchedulesUCArgs): Promise<IFetchSchedulesUCResponse[]>
}