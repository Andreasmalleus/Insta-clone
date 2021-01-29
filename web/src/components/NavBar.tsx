import { gql, useQuery } from '@apollo/client';
import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement, useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import NextLink from "next/link";
import { AiFillHome, AiOutlineCompass, AiOutlineHome, AiFillCompass } from 'react-icons/ai';
import { FiSend} from 'react-icons/fi';
import { useRouter } from 'next/router';
import { UserDropdown } from './Dropdown/UserDropdown';
import { ActivityDropdown } from './Dropdown/ActivityDropdown';
import { IoCreateOutline, IoCreate } from 'react-icons/io5';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {

    const { setColorMode } = useColorMode();

    useEffect(() => {
        setColorMode('light')
    })

    const {data} = useQuery(gql`
        query Me{
            me{
                id,
                username,
            }
        }
    `)    

    const router = useRouter();    
    
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
                    <IconButton 
                        as={router.pathname == '/' ? AiFillHome : AiOutlineHome} 
                        w="25px" h="25px" mr={2} 
                        aria-label="home" 
                        onClick={() => router.push('/')} 
                        bg="none"
                    />
                    <IconButton as={FiSend as any} w="25px" h="25px" mr={2}  aria-label="messages" onClick={() => console.log("messages")} bg="none"/>
                    <IconButton 
                        as={router.pathname == '/explore' ? AiFillCompass : AiOutlineCompass} 
                        w="25px" h="25px" 
                        mr={2} 
                        aria-label="explore" 
                        onClick={() => router.push("/explore")} 
                        bg="none"
                    />
                    <IconButton 
                        as={router.pathname == '/create' ? IoCreate : IoCreateOutline} 
                        w="25px" h="25px" 
                        mr={2} 
                        aria-label="create" 
                        onClick={() => router.push("/create")} 
                        bg="none"
                    />
                    <ActivityDropdown />
                    <UserDropdown id={data?.me?.id}/>
                </Flex>
            </Flex>
        </Flex>
    );
}