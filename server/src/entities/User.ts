import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique : true})
    username!: string;

    @Column({unique: true})
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => Post, post => post.creator)
    posts : Post[]

    @OneToMany(() => Like, like => like.userId)
    likes : Like[]

    @OneToMany(() => Comment, comment => comment.userId)
    comments : Comment[]

    @CreateDateColumn({type : 'date'})
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}