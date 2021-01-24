import React from 'react'
import { Flex, Box, Icon, Text, InputGroup, Input, InputRightElement, IconButton, Link } from '@chakra-ui/react';
import { NavBar } from '../../components/NavBar';
import { Wrapper } from '../../components/Wrapper';
import { FiUser, FiSend, FiBookmark } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoChatbubbleOutline,IoAddCircleOutline } from 'react-icons/io5';
import { Comment } from "../../components/Comment"; 
import { useRouter } from 'next/router';
import { posts } from "../../mockData";

interface PostProps {

}

const Post: React.FC<PostProps> = ({}) => {

    const router = useRouter();

    const pushToUserPage = () => {
        router.push({
            pathname : '/[username]',
            query : {username : "username"}
        })
    }

    const post = posts[0];

    return (
        <Flex direction="column" alignItems="center" bg="whitesmoke" h="100%">
            <NavBar />
            <Wrapper variant="regular">
                <Flex w="100%" h="600px" maxH="600px" bg="white" border="1px" borderColor="lightgrey" borderRadius="3px">
                    <Box bg="tomato" h="100%" w="65%">
                        Image
                    </Box>
                    <Flex w="35%" direction="column" h="600px">

                        <Flex h="70px" justify="space-between" alignItems="center" className="user info" borderBottom="1px" borderColor="lightgrey">
                            <Flex alignItems="center" my={4} ml={1}>
                                <Box>
                                    <IconButton as={FiUser as any} w="30px" h="30px" aria-label="user-image" bg="none" onClick={() => pushToUserPage()}/>
                                </Box>
                                <Link ml={2} fontWeight="bold" onClick={() => pushToUserPage()}>
                                    {post.creator.username}
                                </Link>
                            </Flex>
                            <Icon as={BsThreeDots as any} w="20px" h="20px" mr={4}/>
                        </Flex>

                        <Flex borderColor="lightgrey" direction="column" className="comments" h="530px" overflow="hidden">
                            <Box overflowY="scroll">
                                <Flex mt={2} alignItems="flex-start" ml={2}>
                                    <Icon as={FiUser} w="30px" h="30px" mr={2}/>
                                    <Flex direction="column" w="100%"> 
                                        <Box>
                                            <Box as="span" fontWeight="bold" mr={2}>{post.creator.username}</Box>  
                                            <Box as="span" fontSize="15px">{post.description}</Box>    
                                        </Box> 
                                        <Text mr={3} mt={3} color="grey" fontSize="13px">{post.createdAt}</Text>    
                                    </Flex>
                                    <Box w="15px" h="15px" mr={2} mt={2}/>
                                </Flex>
                                {post.comments.map(comment => (
                                    <Comment key={comment.id} {...comment}></Comment>
                                ))}
                                <Flex w="100%" justify="center">
                                    <IconButton aria-label="More comments" as={IoAddCircleOutline} bg="none" w="30px" h="30px" my={4}/>
                                </Flex>
                            </Box>    

                            <Flex justify="space-between" borderTop="1px" borderColor="lightgrey" alignItems="center">
                                <Box mt={2} ml={1}>
                                    <IconButton as={AiOutlineHeart} w="30px" h="30px" mr={1} cursor="pointer" aria-label="Like post" bg="none" _hover={{bg: "none"}}/>
                                    <IconButton as={IoChatbubbleOutline} w="30px" h="30px" mr={1} cursor="pointer" aria-label="Add comment" bg="none" _hover={{bg: "none"}}/>
                                    <IconButton as={FiSend} w="30px" h="30px" cursor="pointer" aria-label="Share post" bg="none" _hover={{bg: "none"}}/>
                                </Box>
                                <IconButton as={FiBookmark} w="30px" h="30px" mr={1} cursor="pointer" aria-label="Bookmark post" bg="none" _hover={{bg: "none"}}/>
                            </Flex>
                            <Text fontWeight="bold" ml={2} >{post.likes} likes</Text>
                            <Text fontSize="13px" color="grey" ml={2} mb={1}>{post.createdAt}</Text>
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
                        </Flex>
                    </Flex>
                </Flex>
            </Wrapper>  
        </Flex>
    );
}

export default Post;