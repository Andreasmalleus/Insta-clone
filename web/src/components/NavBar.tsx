import { gql, useQuery } from '@apollo/client';
import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link";
import { AiFillHome, AiOutlineCompass, AiOutlineHeart } from 'react-icons/ai';
import { FiSend, FiUser } from 'react-icons/fi';

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
        <Flex w="100%" h="60px" position="sticky" borderBottom="1px" borderColor="lightgrey" justify="center" bg="white">
            <Flex w="100%" maxW="950px" justify="space-between" align="center">
                <Box my={4} fontSize="25px">
                    <NextLink href="/">
                        ɪɴꜱᴛᴀᴄʟᴏɴᴇ
                    </NextLink>
                </Box>
                <Box my={4}>
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
                <Flex my={4} alignItems="center">
                    <IconButton as={AiFillHome as any} w="25px" h="25px" mr={2} aria-label="home" onClick={() => console.log("home")}/>
                    <IconButton as={FiSend as any} w="25px" h="25px" mr={2} aria-label="messages" onClick={() => console.log("messages")}/>
                    <IconButton as={AiOutlineCompass as any} w="25px" h="25px" mr={2} aria-label="explore" onClick={() => console.log("explore")}/>
                    <IconButton as={AiOutlineHeart as any} w="30px" h="30px" mr={4} aria-label="activity" onClick={() => console.log("activity")}/>
                    <IconButton as={FiUser as any} w="30px" h="30px" aria-label="pofile"></IconButton>
                </Flex>
            </Flex>
        </Flex>
    );
}