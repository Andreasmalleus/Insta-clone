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
import session from "express-session";
import cors from "cors";
import connectRedis from "connect-redis";
import Redis from "ioredis";

const main = async () => {
    await createConnection({
        type : 'postgres',
        url : process.env.DATABASE_URL,
        synchronize : true,
        entities : [User, Post, Like, Comment]
    })

    const app = express();

    app.use(cors({
        origin : process.env.CORS_ORIGIN,
        credentials : true
    }))

    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(session({
        name : process.env.COOKIE_NAME,
        store : new RedisStore({
            client : redis,
            disableTTL : false,
            disableTouch : true
        }),
        cookie : {
            secure : false,
            httpOnly : true,
            maxAge : 1000 * 60 * 60 * 24 * 365 * 10,
            sameSite : 'lax'
        },
        secret : process.env.SESSION_SECRET as string,
        saveUninitialized : true,
        resave : true

    }))

    const apolloServer = new ApolloServer({
        schema : await buildSchema({
            resolvers : [UserResolver, PostResolver],
            validate : false  
        }),
        context : ({req,res}) => ({req,res, redis})
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