import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
    @Field()
    password: string;

    @Field()
    login: string;
}