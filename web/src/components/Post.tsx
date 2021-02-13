import { Box, Divider, Flex, IconButton, Input, InputGroup, InputRightElement, Link, Image, Avatar, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { FiBookmark, FiSend, FiUser } from 'react-icons/fi';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { pushToProfile } from '../utils/pushToProfile';
import { useMutation } from '@apollo/client';
import { COMMENT } from '../graphql/mutations';


type creator = {
    id : number;
    username : string;
    createdAt : string;
    url : string
}

type comments = {
    id : number;
    creator :  creator;
    text : string;
    likes : number;
}

interface PostProps {
    id : number;
    description : string;
    type : string;
    url : string;
    creator : creator;
    likes : number;
    comments : {
        comments : comments[],
        hasMore : boolean
    };
    updatedAt : string;
    createdAt : string;
    userId : number
}

export const Post: React.FC<PostProps> = ({...props}) => {

    const router = useRouter();
    
    const [text, setText] = useState("");

    const [createComment] = useMutation(COMMENT);

    const {username, id, url} = props.creator;

    return (
        <Box className="media" w="100%" border="1px" borderColor="lightgrey" borderRadius={4} my={6} mx={1} bg="white">
            <Box className="header" mx={2} my={2}>
                <Flex justify="space-between" alignItems="center">
                    <Box>
                        <Flex alignItems="center">
                                <Box 
                                    onClick={() => pushToProfile(router, id)} 
                                    cursor="pointer"
                                >
                                    <Avatar src={url != "" ? url : ""} w="35px" h="35px" bg="black"/>
                                </Box>
                            <Link ml={2} fontWeight="bold" onClick={() => pushToProfile(router,id)}>
                                {username}
                            </Link>
                        </Flex> 
                    </Box>
                    <IconButton as={BsThreeDots as any} w="20px" h="20px" bg="none" cursor="pointer" aria-label="More options" _hover={{bg : "white"}}/>
                </Flex>
            </Box>
            <Flex className="content" bg="white" width="100%" justifyContent="center" alignItems="center">
                <Image src={props.url} maxH="700px" width="100%"/>
            </Flex>
            <Box className="footer">
                <Box className="buttons" mx={2}>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Box mt={2}>
                            <Flex>
                                <IconButton as={AiOutlineHeart as any} w="35px" h="35px" aria-label="Like post" bg="none" cursor="pointer"/>
                                <IconButton 
                                    as={IoChatbubbleOutline as any} 
                                    w="30px" h="30px" 
                                    aria-label="Add comment" 
                                    bg="none"
                                    onClick={() => {
                                        const id = props.id;
                                        router.push({
                                            pathname : "/post/[id]",
                                            query : {id}
                                        })
                                    }}
                                    cursor="pointer"
                                    />
                                <IconButton as={FiSend as any} w="30px" h="30px" aria-label="Share post" bg="none" cursor="pointer"/>
                            </Flex>
                        </Box>
                        <Box>
                            <IconButton as={FiBookmark as any} w="30px" h="30px" aria-label="Bookmark post" bg="none" cursor="pointer"/>
                        </Box>
                    </Flex>
                </Box>
                <Box className="details" fontSize="15px" mx={2}>
                    <Box fontWeight="bold" onClick={() => console.log("Open likes modal")} border="none" cursor="pointer">
                        {props.likes} likes
                    </Box>
                    <Flex>
                        <Link className="creator" mr={1} fontWeight="bold" cursor="pointer" onClick={() => pushToProfile(router, id)}>
                            {username}
                        </Link>
                        <Box className="creator">
                            {props.description}
                        </Box>
                    </Flex>
                </Box>
                {props.comments ?
                    <Box className="comments" fontSize="15px" mx={2}>
                    {props?.comments.comments.length > 2 
                        ?
                        <Link color="grey">
                        View all 66 comments
                        </Link>
                        : null
                    }
                    {props?.comments.comments.map((comment,i) => (
                        <Flex className="comment" key={i} justify="space-between" alignItems="center">
                            <Box>
                                <Link as="span" fontWeight="bold" mr={1} cursor="pointer" onClick={() => pushToProfile(router,comment.creator.id)}>
                                    {comment.creator.username}
                                </Link>
                                <Box as="span">
                                    {comment.text}
                                </Box>
                            </Box>
                            <IconButton as={AiOutlineHeart} w="15px" h="15px" mr={2} bg="none" cursor="pointer" aria-label="Like post"/>
                        </Flex>
                    ))}
                    </Box>
                : null       
                }   
                <Box className="post-time" my={2} mx={2} fontSize="13px" color="grey" cursor="pointer">
                    {props.createdAt}
                </Box>
                <Divider size="4px"></Divider>
                <Box className="add-comment" border="none" mx={4}>
                    <InputGroup size="md">
                        <Input  
                            type="text"
                            placeholder="Add a comment"
                            variant="unstyled"
                            p="10px"
                            defaultValue={text}
                            onChange={({target : {value}}) => {
                                setText(value)
                            }}
                        />
                        <InputRightElement
                            children={<Button isDisabled={text ? false : true}>Post</Button>}
                            onClick={() => {
                                createComment({
                                    variables : {
                                        options : {
                                            postId : props.id,
                                            userId : props.userId,
                                            text
                                        }
                                    }
                                })
                            }}
                            color="blue.500"
                        />
                    </InputGroup>
                </Box>
            </Box>
        </Box>
    );
}