import { Field, InputType } from "type-graphql";

@InputType()
export class ScheduleInput {
    @Field()
    teacherId: string;

    @Field()
    customerId: string;

    @Field()
    startsAt: Date;

    @Field()
    endsAt: Date;

    @Field()
    location: string;

    @Field()
    subject: string;
}

@InputType()
export class FetchScheduleInput {
    @Field()
    customerId: string;
}