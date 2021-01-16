import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import "dotenv-safe/config";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { Like } from "./entities/Like";
import { Comment } from "./entities/Comment";

const main = async () => {
    const app = express();

    const connection = await createConnection({
        type : 'postgres',
        url : process.env.DATABASE_URL,
        synchronize : true,
        entities : [User, Post, Like, Comment]
    })

    app.listen(process.env.PORT, () => {
        console.log(`Listening at port ${process.env.PORT}`);
    })
}

main().catch(err => console.log(err))