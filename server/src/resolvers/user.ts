import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { validateRegister } from "../utils/validateRegister";
import { RegisterInput } from "./RegisterInput";
import argon from "argon2";

@ObjectType()
class FieldError{
    @Field()
    field: string

    @Field()
    message: string
}

@ObjectType()
class UserResponse{
    @Field(() => FieldError, {nullable :true})
    error?: FieldError

    @Field(() => User, {nullable :true})
    user?: User
}

@Resolver(User)
export class UserResolver{

    @Query(() => User)
    async me(
        @Arg("id") id : number
    ){
        return await User.findOne(id)
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options : RegisterInput,
    ) : Promise<UserResponse>{     
        const error = validateRegister(options);

        if(error){
            return error;
        }      

        const hash = await argon.hash(options.password);

        let user;

        try{
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    ...options,
                    password : hash
                })
                .returning('*')
                .execute();            
            user = result.raw[0];
        }catch(e){
            return {
                error : {
                    field : "usernameOrEmail",
                    message : e,
                }
                
            }             
        }            
        return {user};
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail : string,
        @Arg("password") password : string,
    ) : Promise<UserResponse>{     

        let isEmail = false;

        if(usernameOrEmail.includes('@')){
            isEmail = true;
        }

        const user = await User.findOne({
            where : isEmail ? 
                { email : usernameOrEmail} 
                : 
                {username : usernameOrEmail}
        })

        if(!user){
            return {
                error : {
                    field : 'usernameOrEmail',
                    message : 'user does not exists'
                }
            };
        }

        const valid = await argon.verify(user.password, password);

        if(!valid){
            return {
                error : {
                    field : 'usernameOrEmail',
                    message : 'password is incorrect' 
                }
            }
        }

        return {user};
    }
}