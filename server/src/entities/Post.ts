import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";
import { PaginatedComments } from "../resolvers/types";

@ObjectType()
@Entity()
export class Post extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    description!: string;

    @Field()
    @Column()
    type! : string;

    @Field()
    @Column()
    url! : string;

    @Field(() => User)
    @ManyToOne(() => User, user => user.posts)
    creator! : User;

    @Field()
    @Column()
    creatorId!: number

    @Field(() => Like)
    @OneToMany(() => Like, like => like.postId)
    likes : Like[]

    @Field(() => PaginatedComments)
    @OneToMany(() => Comment, comment => comment.postId)
    comments : PaginatedComments

    @Field(() => String)
    @CreateDateColumn({type : 'date'})
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date

}