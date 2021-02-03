import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
    query getPosts($limit: Int){
        posts{
            id,
            description,
            url,
            type,
            creator{
                id,
                url,
                username,
            }
            comments(limit : $limit){
                text,
                creator{
                    username
                }
            }
            createdAt
        }
    }
`

export const FETCH_POST = gql`
    query Post($id: Int!){
        post(id : $id){
            id,
            description,
            url,
            type,
            creator{
                id
                username,
                url
            }
            createdAt
        }
    }
`

export const FETCH_ME = gql`
    query Me{
        me{
            id,
            username,
            url
        }
    }
`