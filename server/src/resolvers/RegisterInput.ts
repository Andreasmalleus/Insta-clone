import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput{
    @Field()
    username! : string

    @Field()
    email! : string

    @Field()
    fullName! : string

    @Field()
    password! : string
}