import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Like extends BaseEntity{

    @ManyToOne(() => User, user => user.likes)
    user : User;

    @Field()
    @PrimaryColumn()
    userId : number;

    @ManyToOne(() => Post, post => post.likes, {
        onDelete : 'CASCADE'
    })
    post : Post;

    @Field()
    @PrimaryColumn()
    postId : number

}