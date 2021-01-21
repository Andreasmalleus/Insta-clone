import { Box } from '@chakra-ui/react';
import React from 'react'
import { MediaHeader } from './MediaHeader';
import { MediaFooter } from './MediaFooter';

interface MediaProps {

}

export const Media: React.FC<MediaProps> = ({}) => {
    return (
        <Box className="media" w="100%" border="1px" borderColor="lightgrey" borderRadius={4} my={6} mx={1} bg="white">
            <MediaHeader/>
            <Box className="content" height="700px" bg="tomato" width="100%" d="flex" justifyContent="center" alignItems="center">
                Image
            </Box>
            <MediaFooter/>
        </Box>
    );
}