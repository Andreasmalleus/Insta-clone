import React from 'react'
import { Box, Flex, Icon } from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';

interface SuggestionProps {
    username : string;
    url : string;
}

export const Suggestion: React.FC<SuggestionProps> = ({username, url}) => {
    return (
        <Box className="suggestion" mt={2}>
            <Flex alignItems="center" justifyContent="space-between">
                <Box mr={2}>
                <Flex align="center">
                    <Icon as={FiUser as any} w="30px" h="30px" mr={1}></Icon>
                    <Flex direction="column" ml={2}>
                        <Box fontSize="13px" fontWeight="bold">{username}</Box>
                        <Box fontSize="12px" color="grey">Followed by trandon + 38 more</Box>
                    </Flex>
                </Flex>
                </Box>
                <Box color="coral" fontWeight="bold" fontSize="12px">
                    Follow
                </Box>
            </Flex>
        </Box>
    );
}