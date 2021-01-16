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

    @Field(() => Post)
    @ManyToOne(() => Post, post => post.comments, {
        onDelete : 'CASCADE'
    })
    post : Post;

    @Field()
    @PrimaryColumn()
    postId : number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.comments)
    user : User;

    @Field()
    @PrimaryColumn()
    userId : number;

    @Field(() => String)
    @CreateDateColumn({type : 'date'})
    createdAt: Date;
}