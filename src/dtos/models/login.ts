import { Field, ObjectType, registerEnumType } from "type-graphql";

import { AllUserType } from "@/dtos/enums";

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