import React from 'react'
import { Box, Flex, Icon } from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';

interface UserProps {

}

export const User: React.FC<UserProps> = ({}) => {
    return (
        <Box className="user" mt={6} width="100%">
            <Flex alignItems="center" width="100%" justifyContent="space-between">
            <Box mr={2}>
                <Flex alignItems="center">
                <Icon as={FiUser as any} w="55px" h="55px" mr={1}></Icon>
                <Box mr={2}>Username</Box>
                </Flex>
            </Box>
            <Box color="coral" fontWeight="bold" fontSize="12px">
                Log out
            </Box>
            </Flex>
        </Box>
    );
}