import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Comment extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id! : number;

    @Field()
    @Column()
    text! : string;

    @ManyToOne(() => Post, post => post.comments, {
        onDelete : 'CASCADE'
    })//if post is deleted then comments are also deleted
    post : Post;

    @Field()
    @PrimaryColumn()
    postId : number;

    @Field(() => User)//graphql type
    @ManyToOne(() => User, user => user.comments, {
        onDelete : 'CASCADE'
    })//if user is deleted then comments are also deleted
    creator : User;

    @Field()
    @PrimaryColumn()
    userId : number;

    @Field(() => String)
    @CreateDateColumn({type : 'date'})
    createdAt: Date;
}