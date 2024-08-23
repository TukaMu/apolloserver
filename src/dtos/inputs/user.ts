import { Field, InputType, registerEnumType } from "type-graphql";
import { UserType } from "../enums/user-type";

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