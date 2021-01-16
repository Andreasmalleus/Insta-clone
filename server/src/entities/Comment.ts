import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id! : number;

    @Column()
    text! : string;

    @ManyToOne(() => Post, post => post.comments, {
        onDelete : 'CASCADE'
    })
    post : Post;

    @PrimaryColumn()
    postId : number;

    @ManyToOne(() => User, user => user.comments)
    user : User;

    @PrimaryColumn()
    userId : number;

    @CreateDateColumn({type : 'date'})
    createdAt: Date;
}