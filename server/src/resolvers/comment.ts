import { Resolver } from "type-graphql";
import { Comment } from "../entities/Comment";
import { FieldResolver, Root } from "type-graphql";
import { User } from "../entities/User";



@Resolver(Comment)
export class CommentResolver{

    @FieldResolver(() => User)
    async creator(
        @Root() comment : Comment
    ) : Promise<User>{
        const user = await User.findOne({where : {id : comment.userId}});
        return user!;
    }
}