import React from 'react'
import { Box, Flex, Icon } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';

interface MediaHeaderProps {

}

export const MediaHeader: React.FC<MediaHeaderProps> = ({}) => {
    return (
        <Box className="header" mx={4} my={2}>
            <Flex justify="space-between" alignItems="center">
                <Box>
                    <Flex alignItems="center">
                        <Box>
                            <Icon as={FiUser as any} w="35px" h="35px"></Icon>
                        </Box>
                        <Box ml={2}>Name</Box>
                    </Flex> 
                </Box>
                <Icon as={BsThreeDots as any} w="20px" h="20px"></Icon>
            </Flex>
        </Box>
    );
}