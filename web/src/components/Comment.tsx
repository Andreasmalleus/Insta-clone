import React from 'react'
import { Flex, Icon, Box, Text, Avatar } from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { comment } from "../types";
import { useRouter } from 'next/router';
import { pushToProfile } from '../utils/pushToProfile';

export const Comment: React.FC<comment> = ({creator, text,likes,createdAt}) => {
    
    const router = useRouter();

    const {id ,url, username} = creator;

    return (
        <Flex mt={2} alignItems="flex-start" ml={2}>
            <Box 
                onClick={() => pushToProfile(router, id)} 
                cursor="pointer"
                mr={2}
            >
                <Avatar src={url != "" ? url : ""} w="30px" h="30px" bg="black"/>
            </Box>
            <Flex direction="column" w="100%"> 
                <Box>
                    <Box as="span" fontWeight="bold" mr={2}>{username}</Box>  
                    <Box as="span" fontSize="15px">{text}</Box>    
                </Box> 
                <Flex mt={3}>
                    <Text mr={3} color="grey" fontSize="13px">{createdAt}</Text>    
                    <Text color="grey" fontSize="13px">{likes} likes</Text>    
                </Flex>
            </Flex>
            <Icon as={AiOutlineHeart} w="15px" h="15px" mr={2} mt={2}/>
        </Flex>
    );
}