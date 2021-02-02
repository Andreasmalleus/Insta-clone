import { gql } from "@apollo/client";

export const CREATE_POST = gql`
    mutation CreatePost($file: Upload!, $description: String!){
        createPost(file : $file, description : $description){
            id,
            description,
            url,
            type,
            creator{
                id,
                url,
                username,
            }
        }
    }
`

export const LOGIN = gql`
    mutation Login($usernameOrEmail: String!, $password: String!){
        login(usernameOrEmail:$usernameOrEmail, password : $password){
            user{
                id,
                username
            }
            error{
                field,
                message
            }
        }
    }
`

export const REGISTER = gql`
    mutation Register($options : RegisterInput!){
        register(options : $options){
            user{
                id,
                username,
            }
            error{
                field,
                message
            }
        }
    }
`

export const UPLOAD_PROFILE_IMAGE = gql`
    mutation UploadProfileImage($file : Upload!){
        uploadProfileImage(file: $file){
            id,
            url
        }
    }
`