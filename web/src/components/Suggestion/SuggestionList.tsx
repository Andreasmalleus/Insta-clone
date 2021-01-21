import React from 'react'
import { Box, Flex } from '@chakra-ui/react';
import { Suggestion } from "./Suggestion";

interface SuggestionListProps {

}

export const SuggestionList: React.FC<SuggestionListProps> = ({}) => {
    return (
        <Box className="suggestions">
            <Flex justifyContent="space-between" alignItems="center" fontSize="13px" mt={6} mb={2}>
            <Box color="grey">
                Suggestions for you
            </Box>
            <Box fontWeight="bold">
                See All
            </Box>
            </Flex>
            <Suggestion username="sixtan11" url=""/>
            <Suggestion username="veedel1" url=""/>
            <Suggestion username="randa" url=""/>
            <Suggestion username="mango" url=""/>
        </Box>
    );
}