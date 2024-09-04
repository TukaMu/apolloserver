import { Field, InputType, registerEnumType } from "type-graphql";
import { UserType } from "@/dtos/enums";

registerEnumType(UserType, {
    name: "UserType",
});

@InputType()
export class StoreUserInput {
    @Field()
    name: string;

    @Field()
    password: string;

    @Field()
    login: string;

    @Field(() => [UserType])
    type: UserType[];
}