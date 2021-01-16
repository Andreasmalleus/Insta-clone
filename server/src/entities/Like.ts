import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Like extends BaseEntity{

    @ManyToOne(() => User, user => user.likes)
    user : User;

    @PrimaryColumn()
    userId : number;

    @ManyToOne(() => Post, post => post.likes, {
        onDelete : 'CASCADE'
    })
    post : Post;

    @PrimaryColumn()
    postId : number

}