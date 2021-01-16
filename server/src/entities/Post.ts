import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    description!: string;

    @Column()
    type! : string;

    @Column()
    url! : string;

    @ManyToOne(() => User, user => user.posts)
    creator! : User;

    @Column()
    creatorId: number

    @OneToMany(() => Like, like => like.postId)
    likes : Like[]

    @OneToMany(() => Comment, comment => comment.postId)
    comments : Comment[]

    @CreateDateColumn({type : 'date'})
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date

}