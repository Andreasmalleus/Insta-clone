import { Box, Flex } from '@chakra-ui/react';
import React from 'react'

interface CommentListProps {

}

interface CommentProps {
    text : string,
    username : string
}

export const CommentList: React.FC<CommentListProps> = ({}) => {
    return (
        <Box className="comments" fontSize="15px" mx={4}>
            <Box className="comment" color="grey">
                View all 66 comments
            </Box>
            <Comment username="saxid22" text="Hey thats nice"/>
            <Comment username="simba12" text="Not bad not bad at all"/>
        </Box>
    );
}


const Comment : React.FC<CommentProps>= ({text, username}) => {
    return (
        <Box className="comment">
            <Flex>
                <Box fontWeight="bold" mr={1}>
                    {username}
                </Box>
                <Box>
                    {text}
                </Box>
            </Flex>
        </Box>
    );
}