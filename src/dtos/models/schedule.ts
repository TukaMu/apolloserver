import { Field, ObjectType } from "type-graphql";

import { UserModelResponse } from ".";

@ObjectType()
export class ScheduleModel {
    @Field()
    id: string;

    @Field()
    customerId: string;

    @Field()
    teacherId: string;

    @Field()
    location: string;

    @Field()
    subject: string;

    @Field()
    startsAt: Date;

    @Field()
    endsAt: Date;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@ObjectType()
export class ScheduleResponseModel extends ScheduleModel {
    @Field(() => UserModelResponse, { nullable: true })
    customer?: UserModelResponse;

    @Field(() => UserModelResponse, { nullable: true })
    teacher?: UserModelResponse;
}