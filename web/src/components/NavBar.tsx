import { gql, useQuery } from '@apollo/client';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react'

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {

    const {data} = useQuery(gql`
        query Me{
        me{
            id,
            username,
        }
        }
    `)

    return (
        <Flex w="100%" bg="whitesmoke" h={50} position="sticky" borderWidth="1px" borderColor="black">
            <Flex maxW={800} justifyContent="center" align="center">
                <Box m={4}>
                    Instaclone
                </Box>
                <Box m={4}>
                    {data?.me.username}
                </Box>
            </Flex>
        </Flex>
    );
    
}