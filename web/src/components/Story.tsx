import React from 'react'
import { Box, Flex, Icon } from '@chakra-ui/react';
import Image from "next/image"
import { FiUser } from "react-icons/fi";

interface StoryProps {
    username : string;
    url : string;
}

export const Story: React.FC<StoryProps> = ({username, url}) => {
    return (
        <Box className="story" ml={2} my={2}>
            <Flex direction="column" align="center">
                <Box> 
                    <Icon as={FiUser as any} w="45px" h="45px"></Icon>
                </Box>
                <Box fontSize="12px">
                    {username}    
                </Box>               
            </Flex>
        </Box>
    );
}