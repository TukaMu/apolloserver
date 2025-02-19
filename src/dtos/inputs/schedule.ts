import { Field, InputType, registerEnumType } from "type-graphql";

import { Percentage, ScheduleSubject } from "@/dtos/enums";

registerEnumType(Percentage, {
    name: "Percentage",
});

registerEnumType(ScheduleSubject, {
    name: "ScheduleSubject",
});

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
    value: number;

    @Field(() => String)
    subject: ScheduleSubject;

    @Field(() => String)
    percentage: Percentage;
}

@InputType()
export class FetchScheduleInput {
    @Field()
    customerId: string;
}