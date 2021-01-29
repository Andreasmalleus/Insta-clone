import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class User extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({unique : true})
    username!: string;

    @Field()
    @Column({unique: true})
    email!: string;

    @Field()
    @Column({nullable : true})
    fullName!: string;

    @Column()
    password!: string;

    @Field(() => [Post])
    @OneToMany(() => Post, post => post.creator)
    posts : Post[]

    @OneToMany(() => Like, like => like.userId)
    likes : Like[]

    @OneToMany(() => Comment, comment => comment.userId)
    comments : Comment[]

    @Field(() => String)
    @CreateDateColumn({type : 'date'})
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date
}