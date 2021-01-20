import { gql, useQuery } from '@apollo/client';
import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, Input, InputGroup, InputLeftElement, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link";

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
        <Flex w="100%" bg="whitesmoke" h={50} position="sticky" borderWidth="1px" borderColor="black" justify="center">
            <Flex w="100%" maxW="800px" justify="space-between" align="center">
                <Box m={4}>
                    <NextLink href="/">
                        ɪɴꜱᴛᴀᴄʟᴏɴᴇ
                    </NextLink>
                </Box>
                <Box m={4}>
                <Box spacing={4}>
                    <InputGroup size="xs">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.300" />}
                        />
                        <Input  
                            type="text"
                            placeholder="Search"
                        />
                    </InputGroup>
                </Box>
                </Box>
                <Box m={4}>
                    {data?.me.username}
                </Box>
            </Flex>
        </Flex>
    );
    
}