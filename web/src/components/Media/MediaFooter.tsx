import React from 'react'
import { Box, Flex, Icon, Divider, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { FiSend, FiBookmark } from 'react-icons/fi';
import { CommentList } from './MediaComment';

interface MediaFooterProps {

}

export const MediaFooter: React.FC<MediaFooterProps> = ({}) => {
    return (
        <Box className="footer">
            <Box className="buttons" mx={4}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Box mt={2}>
                        <Flex>
                            <Icon as={AiOutlineHeart as any} w="35px" h="35px" mr={4}></Icon>
                            <Icon as={IoChatbubbleOutline as any} w="30px" h="30px" mr={4}></Icon>
                            <Icon as={FiSend as any} w="30px" h="30px"></Icon>
                        </Flex>
                    </Box>
                    <Box>
                        <Icon as={FiBookmark as any} w="30px" h="30px"></Icon>
                    </Box>
                </Flex>
            </Box>
            <Box className="details" fontSize="15px" mx={4}>
                <Box className="likes" fontWeight="bold">
                    2406 likes
                </Box>
                <Flex>
                    <Box className="creator" mr={1} fontWeight="bold">
                        Name
                    </Box>
                    <Box className="creator">
                        Description
                    </Box>
                </Flex>
            </Box>
            <CommentList />
            <Box className="post-time" my={2} mx={4} fontSize="10px" color="grey">
                3 HOURS AGO
            </Box>
            <Divider size="4px"></Divider>
            <Box className="add-comment" border="none" mx={4}>
                <InputGroup size="md">
                    <Input  
                        type="text"
                        placeholder="Add a comment"
                        variant="unstyled"
                        p="10px"
                    />
                    <InputRightElement
                        children={"Post"}
                    />
                </InputGroup>
            </Box>
        </Box>
    );
}