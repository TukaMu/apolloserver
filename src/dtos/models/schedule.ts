import { Field, ObjectType } from "type-graphql";
import { UserModelResponse } from "./user";

@ObjectType()
export class ScheduleModel {
    @Field()
    id: string;

    @Field()
    customerId: string;

    @Field(() => UserModelResponse, { nullable: true })
    customer?: UserModelResponse;

    @Field()
    teacherId: string;

    @Field(() => UserModelResponse, { nullable: true })
    teacher?: UserModelResponse;

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