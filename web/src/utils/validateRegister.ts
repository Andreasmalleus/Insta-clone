interface RegisterInput {
    email : string,
    fullName : string,
    username : string,
    password : string
}

interface RegisterOutput {
    error : {
        field : string,
        message : string
    }
}

export const validateRegister = (values : RegisterInput) : RegisterOutput | null =>{

    const expression = new RegExp(/^[a-zA-Z-'. ]+$/);

    if(!values.email.includes('@')){
        return {
            error : {
                field : "email",
                message : "Email must include @"
            }
        }
    }

    if(values.email.length <= 5){
        return {
            error : {
                field : "email",
                message : "Email must be equal or bigger than 5 characters"
            }
        }
    }

    if(!expression.test(values.fullName)){
        return {
            error : {
                field : "fullName",
                message : "Must be a valid full name"
            }
        }
    }

    if(values.username.length == 0){
        return {
            error : {
                field : "username",
                message : "Username cannot be empty"
            }
        }
    }

    if(values.username.length <= 5){
        return {
            error : {
                field : "username",
                message : "Username must be equal or bigger than 5 characters"
            }
        }
    }

    if(values.username.length > 30){
        return {
            error : {
                field : "username",
                message : "Username cannot be more than 30 characters"
            }
        }
    }

    if(values.username.includes('@')){
        return {
            error : {
                field : "username",
                message : "Username must not contain @"
            }
        }
    }

    if(values.password.length == 0){
        return {
            error : {
                field : "password",
                message : "Password cannot be empty"
            }
        }
    }

    if(values.password.length <= 5){
        return {
            error : {
                field : "password",
                message : "Password must be equal or bigger than 5 characters"
            }
        }
    }

    if(values.password.toLowerCase() == values.password){
        return {
            error : {
                field : "password",
                message : "Password must contain at least one capital letter"
            }
        }
    }

    return null;
}