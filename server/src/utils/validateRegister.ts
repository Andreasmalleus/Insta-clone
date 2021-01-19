import { RegisterInput } from "../resolvers/RegisterInput"

interface RegisterOutput {
    error : {
        field : string,
        message : string
    }
}

export const validateRegister = (options : RegisterInput) : RegisterOutput | null =>{
    if(!options.email.includes('@')){
        return {
            error : {
                field : "email",
                message : "email must include @"
            }
        }
    }

    if(options.email.length <= 5){
        return {
            error : {
                field : "email",
                message : "email must be equal or bigger than 5 characters"
            }
        }
    }

    if(options.username.length == 0){
        return {
            error : {
                field : "username",
                message : "username cannot be empty"
            }
        }
    }

    if(options.username.length <= 5){
        return {
            error : {
                field : "username",
                message : "username must be equal or bigger than 5 characters"
            }
        }
    }

    if(options.username.includes('@')){
        return {
            error : {
                field : "username",
                message : "username must not contain @"
            }
        }
    }

    if(options.password.length == 0){
        return {
            error : {
                field : "password",
                message : "password cannot be empty"
            }
        }
    }

    if(options.password.length <= 5){
        return {
            error : {
                field : "password",
                message : "password must be equal or bigger than 5 characters"
            }
        }
    }

    if(options.password.toLowerCase() == options.password){
        return {
            error : {
                field : "password",
                message : "password must contain at least one capital letter"
            }
        }
    }

    return null;
}