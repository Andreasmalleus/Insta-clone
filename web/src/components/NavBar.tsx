import { Box, Flex } from '@chakra-ui/react';
import React from 'react'

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    return (
        <Flex w="100%" bg="whitesmoke" h={50} position="sticky" borderWidth="1px" borderColor="black">
            <Flex maxW={800} justifyContent="center" align="center">
                <Box m={4}>
                    Instaclone
                </Box>
            </Flex>
        </Flex>
    );
}