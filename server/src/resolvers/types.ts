import { ObjectType, Field } from "type-graphql";
import { Comment } from "../entities/Comment";

@ObjectType()
export class PaginatedComments{
    @Field(() => [Comment])
    comments : Comment[]
    @Field(() => Boolean)
    hasMore : boolean
}