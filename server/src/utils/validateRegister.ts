import { RegisterInput } from "../resolvers/RegisterInput"

interface RegisterOutput {
    error : {
        field : string,
        message : string
    }
}

export const validateRegister = (options : RegisterInput) : RegisterOutput | null=>{
    if(options.username.length <= 5){
        return {
            error : {
                field : "usernameOrEmail",
                message : "username must be equal or bigger than 5 characters"
            }
        }
    }

    if(options.username.includes('@')){
        return {
            error : {
                field : "usernameOrEmail",
                message : "username must not contain @"
            }
        }
    }
    
    if(!options.email.includes('@')){
        return {
            error : {
                field : "usernameOrEmail",
                message : "email must include @"
            }
        }
    }

    if(options.email.length <= 5){
        return {
            error : {
                field : "usernameOrEmail",
                message : "email must be equal or bigger than 5 characters"
            }
        }
    }

    return null;
}