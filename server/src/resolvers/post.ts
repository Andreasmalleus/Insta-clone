import { Arg, Field, InputType, Mutation, Query, Resolver, Ctx, UseMiddleware, Int, FieldResolver, Root, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";
import { Comment } from "../entities/Comment";
import { Like } from "../entities/Like";
import { Post } from "../entities/Post";
import { FileUpload } from "graphql-upload";
import { GraphQLUpload } from "apollo-server-express"
import { MyContext } from "../types";
import AWSApi from "../utils/awsApi";
import { isAuth } from "../middlewares/isAuth";
import { User } from "../entities/User";
import { PaginatedComments } from "./types";

@InputType()
class CommentInput{
    @Field(() => Int!)
    postId! : number
    @Field(() => Int!)
    userId! : number
    @Field(() => String!)
    text! : string
}

@ObjectType()
class PaginatedPosts{
    @Field(() => [Post])
    posts : Post[]
    @Field()
    hasMore : boolean
}

const api = new AWSApi()

@Resolver(Post)
export class PostResolver{

    @Query(() => PaginatedPosts, {nullable : true})
    async posts(
        @Arg("limit", () => Int) limit : number,
        @Arg("cursor", () => String, {nullable : true}) cursor : string
    ): Promise<PaginatedPosts | null>{
        //fetching one more than needed to ensure that there is more
        const realLimit = Math.min(10, limit) + 1;

        const replacements : any[] = [realLimit]

        if(cursor){
            replacements.push(new Date(parseInt(cursor)))
        }

        const posts = await getConnection()
        .query(`
            select p.*
            from public.post p
            ${cursor ? 'where p."createdAt" > $2' : ''}
            order by p."createdAt" desc
            limit $1
        `, replacements)
        if(!posts){
            return null;
        } 

        return {
            posts,
            hasMore : posts.length === realLimit
        };
    }
    
    @Query(() => Post, {nullable : true})
    async post(
        @Arg("id", () => Int!) id : number
    ) : Promise<Post | null>{
        const post = await Post.findOne(id, {relations : ['creator']})
        if(!post){
            return null;
        }
        return post;
    }

    @Mutation(() => Post, {nullable : true})
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("file", () => GraphQLUpload!) file : FileUpload,
        @Arg("description") description : string,
        @Ctx() {req} : MyContext
    ) : Promise<Post | null>{
        const {userId} = req.session;

        const {filename, createReadStream, mimetype} = await file;
        const key = `posts/${userId}/${filename}`

        const {url} = await api.upload(key, createReadStream);

        let post;
        try{
            const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Post)
            .values({
                creatorId : userId,
                description,
                url,
                type : mimetype.split("/")[0]
            })
            .returning('*')
            .execute();
            post = result.raw[0]
        }catch(e){            
            return null;
        }        
        return post;
    }

    @Mutation(() => Boolean, {nullable : true})
    async deletePost(
        @Arg("userId") userId : number,
        @Arg("postId") postId : number  
    ) : Promise<Boolean>{
        await Post.delete({creatorId : userId, id: postId})   
        return true;
    }

    @Mutation(() => Boolean)
    async like(
        @Arg("postId") postId : number,
        @Arg("userId") userId : number
    ){
        const like = await Like.findOne({where : {userId, postId}})

        if(like){
            await Like.delete({userId, postId});
            console.log("removed");
            return true;
        }
        await Like.insert({userId, postId})
        console.log("inserted");
        return true
    }

    @Mutation(() => Comment, {nullable : true})
    async comment(
        @Arg("options") options : CommentInput,
    ): Promise<Comment | null>{
        let comment;
        try{
            const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Comment)
            .values(options)
            .returning('*')
            .execute();
            comment = result.raw[0]
        }catch(e){
            console.log(e);
            return null;
        }
        return comment;
    }

    @FieldResolver(() => User)
    async creator(
        @Root() post : Post,
    ) : Promise<User | null>{
        const user = await User.findOne({where : {id : post.creatorId}})
        if(!user){
            return null
        }
        return user;
    }

    @FieldResolver(() => PaginatedComments, {nullable : true})
    async comments(
        @Root() post : Post,
        @Arg("limit", () => Int) limit : number,
        @Arg("cursor", () => String, {nullable : true}) cursor : string,
    ): Promise<PaginatedComments| null>{
        const realLimit = Math.min(10, limit) + 1;

        const replacements : any[] = [post.id, realLimit]

        if(cursor){
            replacements.push(new Date(parseInt(cursor)))
        }

        const comments = await getConnection()
        .query(`
            select * from public.comment c
            where c."postId" = $1 
            ${cursor ? 'and c."createdAt" > $3' : ''}
            order by c."createdAt" desc
            limit $2
        `, replacements)

        if(!comments){
            return null;
        }
        return {
            comments,
            hasMore : comments.length === realLimit
        };
    }
}