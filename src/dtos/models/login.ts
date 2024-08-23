import { Field, ObjectType, registerEnumType } from "type-graphql";

import { AllUserType } from "../enums/user-type";

registerEnumType(AllUserType, {
    name: "AllUserType",
});


@ObjectType()
export class LoginModel {
    @Field()
    token: string;

    @Field(() => [AllUserType])
    type: AllUserType[];
}