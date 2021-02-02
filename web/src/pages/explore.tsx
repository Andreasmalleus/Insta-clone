import React, { useState } from 'react'
import { Flex, Box, Spinner, Image, IconButton, Icon } from '@chakra-ui/react';
import { NavBar } from '../components/NavBar';
import { Wrapper } from '../components/Wrapper';
import { posts } from "../mockData";
import { useQuery, gql } from '@apollo/client';
import { Layout } from '../components/Layout';
import { AiFillHeart } from 'react-icons/ai';
import { IoChatbubble } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { FETCH_POSTS } from '../graphql/queries';


interface ExploreProps {

}

export const Explore: React.FC<ExploreProps> = ({}) => {

    const router = useRouter();

    const {data,loading,error} = useQuery(FETCH_POSTS)

    if(loading){
        return (
            <Layout>
                <Spinner></Spinner>
            </Layout>
        )
    }

    if(!data?.posts){
        return (
            <Layout>
                <Flex justify="center" alignItems="center" w="100%" h="100%">
                    Something went wrong...
                </Flex>
            </Layout>
        )
    }

    return (
        <Layout>
            <Wrapper variant="regular">
                <Flex direction="column" width="100%">
                    <Flex flexWrap="wrap" mt={6} className="posts" justify="space-between">
                        {data.posts.map((post,i) => (
                            <Box 
                                w="31%" h="300px" 
                                mb={8} key={post.id}
                                _hover={{opacity : 0.5}} 
                                cursor="pointer" 
                                onClick={() => router.push({
                                    pathname : "/post/[id]",
                                    query : {id : post.id}
                                })}
                            >
                                <Image src={post.url} h="100%" w="100%" objectFit="contain"/>
                            </Box>
                        ))}
                    </Flex>
                </Flex>
            </Wrapper>  
        </Layout>
    );
}

export default Explore