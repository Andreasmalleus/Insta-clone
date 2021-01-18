import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import "dotenv-safe/config";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { Like } from "./entities/Like";
import { Comment } from "./entities/Comment";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { PostResolver } from "./resolvers/post";
import cors from "cors";

const main = async () => {
    await createConnection({
        type : 'postgres',
        url : process.env.DATABASE_URL,
        synchronize : true,
        entities : [User, Post, Like, Comment]
    })

    const app = express();

    app.use(cors({
        origin : "http://localhost:3000",
        credentials : true
    }))

    const apolloServer = new ApolloServer({
        schema : await buildSchema({
            resolvers : [UserResolver, PostResolver],
            validate : false  
        }),
    })

    apolloServer.applyMiddleware({
        app,
        cors : false
    })

    app.listen(process.env.PORT, () => {
        console.log(`Listening at port ${process.env.PORT}`);
    })
}

main().catch(err => console.log(err))