import { Avatar, Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { pushToProfile } from '../utils/pushToProfile';

interface SuggestionProps {
    username : string;
    url : string;
    id : number
}

export const Suggestion: React.FC<SuggestionProps> = ({username, url, id}) => {

    const router = useRouter();

    return (
        <Box className="suggestion" mt={2}>
            <Flex alignItems="center" justifyContent="space-between">
                <Box mr={2}>
                <Flex align="center">
                    <Box 
                        onClick={() => pushToProfile(router,id)} 
                        cursor="pointer"
                    >
                        <Avatar src={url != "" ? url : ""} w="30px" h="30px" bg="black"/>
                    </Box>
                    <Flex direction="column" ml={2}>
                        <Box fontSize="13px" fontWeight="bold">{username}</Box>
                        <Box fontSize="12px" color="grey">Followed by trandon + 38 more</Box>
                    </Flex>
                </Flex>
                </Box>
                <Box color="blue.500" fontWeight="bold" fontSize="12px">
                    Follow
                </Box>
            </Flex>
        </Box>
    );
}