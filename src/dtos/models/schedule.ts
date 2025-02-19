import { Field, ObjectType, registerEnumType } from "type-graphql";

import { UserModelResponse } from ".";
import { Percentage, ScheduleSubject } from "@/dtos/enums";

registerEnumType(Percentage, {
    name: "Percentage",
});

registerEnumType(ScheduleSubject, {
    name: "ScheduleSubject",
});

@ObjectType()
export class ScheduleModel {
    @Field()
    id: string;

    @Field()
    location: string;

    @Field()
    startsAt: Date;

    @Field()
    endsAt: Date;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field()
    value: number;

    @Field(() => String)
    subject: ScheduleSubject;

    @Field(() => String)
    percentage: Percentage;

    @Field()
    customerId: string;

    @Field()
    teacherId: string;

}

@ObjectType()
export class ScheduleResponseModel extends ScheduleModel {
    @Field(() => UserModelResponse, { nullable: true })
    customer?: UserModelResponse;

    @Field(() => UserModelResponse, { nullable: true })
    teacher?: UserModelResponse;

    @Field(() => String)
    percentageByEnum: Percentage;

    @Field(() => String)
    subjectByEnum: ScheduleSubject;
}