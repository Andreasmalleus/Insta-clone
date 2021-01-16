import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Like extends BaseEntity{

    @Field(() => User)
    @ManyToOne(() => User, user => user.likes)
    user : User;

    @Field()
    @PrimaryColumn()
    userId : number;

    @Field(() => Post)
    @ManyToOne(() => Post, post => post.likes, {
        onDelete : 'CASCADE'
    })
    post : Post;

    @Field()
    @PrimaryColumn()
    postId : number

}