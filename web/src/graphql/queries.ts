import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
    query getPosts($postLimit: Int!, $commentLimit: Int!){
        posts(limit: $postLimit){
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
                comments(limit : $commentLimit){
                    id,
                    text,
                    creator{
                        id
                        username,
                        url
                    }
                }
                createdAt
            }
            hasMore
        }
    }
`

export const FETCH_POST = gql`
    query Post($id: Int!, $limit: Int!){
        post(id : $id){
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
                id,
                text,
                creator{
                    id
                    username,
                    url
                }
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