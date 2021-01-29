import React from 'react'
import { Flex, Box, Icon, Text, InputGroup, Input, InputRightElement, IconButton, Link, Spinner, Image } from '@chakra-ui/react';
import { Wrapper } from '../../components/Wrapper';
import { FiUser, FiSend, FiBookmark } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoChatbubbleOutline,IoAddCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { Layout } from '../../components/Layout';
import { NextPage } from 'next';
import { pushToProfile } from '../../utils/pushToProfile';


const Post: NextPage<{postId: number}> = ({postId}) => {

    const router = useRouter();

    const {data,error,loading} = useQuery(gql`
        query Post($id: Int!){
            post(id : $id){
                id,
                description,
                url,
                type,
                creator{
                    id
                    username,
                }
                createdAt
            }
        }
    `,{
        variables : {
            id : postId
        }
    })

    if(loading){
        return (
            <Layout>
                <Spinner></Spinner>
            </Layout>
        )
    }

    if(!data?.post){
        return (
            <Layout>
                <Flex justify="center" alignItems="center" w="100%" h="100%">
                    There was something wrong with finding this specific post....
                </Flex>
            </Layout>
        )
    }

    const {username} = data.post.creator;

    return (
        <Layout>
            <Wrapper variant="regular">
                <Flex maxH="600px" bg="white" border="1px" borderColor="lightgrey" borderRadius="3px">
                    <Flex bg="white" w="650px">
                        <Image src={data?.post.url} h="100%" w="100%" objectFit="contain"/>
                    </Flex>
                    <Flex direction="column" borderLeft="1px" borderColor="lightgrey" w="300px">

                        <Flex h="70px" justify="space-between" alignItems="center" className="user info" borderBottom="1px" borderColor="lightgrey">
                            <Flex alignItems="center" my={4} ml={1}>
                                <IconButton as={FiUser as any} w="30px" h="30px" aria-label="user-image" bg="none" onClick={() => {
                                    pushToProfile(router, username)
                                }} cursor="pointer"/>
                                <Link ml={2} fontWeight="bold" onClick={() => {
                                    pushToProfile(router, username)
                                }}>
                                    {username}
                                </Link>
                            </Flex>
                            <IconButton as={BsThreeDots as any} w="20px" h="20px" mr={4} aria-label="Go to options" bg="none" cursor="pointer"/>
                        </Flex>

                        <Flex borderColor="lightgrey" direction="column" className="comments" overflow="hidden" justify="space-between" h="100%">
                            <Box overflowY="scroll" h="100%">
                                <Flex mt={2} alignItems="flex-start" ml={2}>
                                    <Icon as={FiUser} w="30px" h="30px" mr={2}/>
                                    <Flex direction="column" w="100%"> 
                                        <Box>
                                            <Box as="span" fontWeight="bold" mr={2}>{username}</Box>  
                                            <Box as="span" fontSize="15px">{data.post.description}</Box>    
                                        </Box> 
                                        <Text mr={3} mt={3} color="grey" fontSize="13px">{data.post.createdAt}</Text>    
                                    </Flex>
                                    <Box w="15px" h="15px" mr={2} mt={2}/>
                                </Flex>
                                
                                <Flex w="100%" justify="center">
                                    <IconButton aria-label="More comments" as={IoAddCircleOutline} bg="none" w="30px" h="30px" my={4}/>
                                </Flex>
                            </Box>    
                            <Box>
                                <Flex justify="space-between" borderTop="1px" borderColor="lightgrey" alignItems="center">
                                    <Box mt={2} ml={1}>
                                        <IconButton as={AiOutlineHeart} w="30px" h="30px" mr={1} cursor="pointer" aria-label="Like post" bg="none" _hover={{bg: "none"}}/>
                                        <IconButton as={IoChatbubbleOutline} w="30px" h="30px" mr={1} cursor="pointer" aria-label="Add comment" bg="none" _hover={{bg: "none"}}/>
                                        <IconButton as={FiSend} w="30px" h="30px" cursor="pointer" aria-label="Share post" bg="none" _hover={{bg: "none"}}/>
                                    </Box>
                                    <IconButton as={FiBookmark} w="30px" h="30px" mr={1} cursor="pointer" aria-label="Bookmark post" bg="none" _hover={{bg: "none"}}/>
                                </Flex>

                                <Text fontWeight="bold" ml={2}></Text>
                                <Text fontSize="13px" color="grey" ml={2} mb={1}></Text>
                                <Box>
                                    <InputGroup size="md" alignItems="center">
                                        <Input  
                                            borderTop="1px"
                                            borderColor="lightgrey"
                                            borderRadius="none"
                                            type="text"
                                            placeholder="Add a comment..."
                                            variant="unstyled"
                                            p="15px"
                                        />
                                        <InputRightElement
                                            mr={1}
                                            children={"Post"}
                                        />
                                    </InputGroup>
                                </Box>       
                            </Box>             
                        </Flex>
                    </Flex>
                </Flex>
            </Wrapper>  
        </Layout>
    );
}

Post.getInitialProps = ({query}) => {
    return {
        postId : parseInt(query.id as string)
    }
}

export default Post;