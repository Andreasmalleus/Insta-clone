import React from 'react'
import { Box, Flex } from '@chakra-ui/react';
import { Story } from './Story';

interface StoryListProps {

}

export const StoryList: React.FC<StoryListProps> = ({}) => {
    return (
        <Box className="stories" maxW="650px" h="100px" border="1px" borderColor="lightgrey" borderRadius={4} mx={1} bg="white">
            <Flex justify="center" h="100%" overflow="auto" flexWrap="wrap" flexDirection="column">
                <Story username="saxon" url=""/>
                <Story username="vinta23" url=""/>
                <Story username="kiidel" url=""/>
                <Story username="jaanika2" url=""/>
                <Story username="jason11" url=""/>
                <Story username="vladimir" url=""/>
                <Story username="chase44" url=""/>
                <Story username="bob" url=""/>
                <Story username="donny2" url=""/>
                <Story username="kustt11" url=""/>
                <Story username="simpel69" url=""/>
                <Story username="weirman" url=""/>
                <Story username="wisher" url=""/>
            </Flex>
        </Box>
    );
}