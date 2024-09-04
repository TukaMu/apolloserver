import { Field, ObjectType, registerEnumType } from "type-graphql";

import { AllUserType } from "@/dtos/enums";

registerEnumType(AllUserType, {
    name: "AllUserType",
});

@ObjectType()
export class UserModel {
    @Field()
    name: string;

    @Field()
    password: string;

    @Field()
    login: string;

    @Field()
    id: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => [AllUserType])
    type: AllUserType[];
}

@ObjectType()
export class UserModelResponse {
    @Field()
    name: string;

    @Field()
    login: string;

    @Field()
    id: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => [AllUserType])
    type: AllUserType[];
}