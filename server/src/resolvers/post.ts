import { Arg, Field, InputType, Mutation, Query, Resolver, Ctx, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Comment } from "../entities/Comment";
import { Like } from "../entities/Like";
import { Post } from "../entities/Post";
import { FileUpload } from "graphql-upload";
import { GraphQLUpload } from "apollo-server-express"
import { MyContext } from "../types";
import AWSApi from "../utils/awsApi";
import { isAuth } from "../middlewares/isAuth";

/*@InputType()
class CreatePostInput{
    @Field()
    description! : string
    @Field()
    creatorId! : number
}*/

@InputType()
class CommentInput{
    @Field()
    postId! : number
    @Field()
    userId! : number
    @Field()
    text! : string
}

const api = new AWSApi()

@Resolver()
export class PostResolver{

    @Query(() => [Post], {nullable : true})
    async posts(
    ): Promise<Post[] | null>{
        const posts = await getConnection()
        .query(`
            select p.*,
            json_build_object(
                'id' , u.id,
                'username' , u.username,
                'email' , u.email,
                'createdAt', u."createdAt",
                'updatedAt', u."updatedAt"
            ) creator
            from public.post p
            inner join public.user u on u.id = p."creatorId"
            order by p."createdAt" desc
        `)
        if(!posts){
            return null;
        } 
        return posts;
    }
    
    @Query(() => Post, {nullable : true})
    async post(
        @Arg("id") id : number
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

    @Query(() => [Comment], {nullable : true})
    async comments(
        @Arg("postId") postId : number,
    ): Promise<Comment[] | null>{
        return await Comment.find({where : {postId}})
    }
}