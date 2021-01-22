import { gql, useQuery } from '@apollo/client';
import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement, MenuItem, Icon, Divider, useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import NextLink from "next/link";
import { AiFillHome, AiOutlineCompass, AiOutlineHeart } from 'react-icons/ai';
import { FiSend, FiUser, FiSettings } from 'react-icons/fi';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { DropDown } from './Dropdown';
import { useRouter } from 'next/router';

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

    const mockData = [
        {
            username : "jaanus",
            createdAt : "4w",
            id: 1
        },
        {
            username : "mzhussky",
            createdAt : "6w",
            id: 2
        },{
            username : "rutsen",
            createdAt : "9w",
            id: 3
        }
    ]

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
                    <IconButton as={AiFillHome as any} w="25px" h="25px" mr={4} aria-label="home" onClick={() => console.log("home")} bg="white"/>
                    <IconButton as={FiSend as any} w="25px" h="25px" mr={4} aria-label="messages" onClick={() => console.log("messages")} bg="white"/>
                    <IconButton as={AiOutlineCompass as any} w="25px" h="25px" mr={4} aria-label="explore" onClick={() => console.log("explore")} bg="white"/>
                    <DropDown icon={AiOutlineHeart} margin={4}>
                        {mockData.map((user, index) => (
                            <React.Fragment key={user.id}>
                                <MenuItem onClick={() => {
                                    router.push("/login")
                                }}>
                                    <Flex justify="space-between" alignItems="center" w="100%">
                                        <Flex alignItems="center">
                                            <Icon as={FiUser as any} w="20px" h="20px" mr={2}/>
                                            <Flex direction="column">
                                                <Box fontWeight="bold">{user.username}</Box>
                                                <Box>started following you. {user.createdAt}</Box>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </MenuItem>
                                {index != mockData.length - 1 ? <Divider/> : null}
                            </React.Fragment>
                        ))}
                    </DropDown>
                    <DropDown icon={FiUser}>
                        <MenuItem>
                            <Icon as={FiUser as any} w="20px" h="20px" mr={2}/>
                            Profile
                        </MenuItem>
                        <MenuItem>
                            <Icon as={FiSettings as any} w="20px" h="20px" mr={2}/>
                            Settings
                        </MenuItem>
                        <MenuItem>
                            <Icon as={HiSwitchHorizontal as any} w="20px" h="20px" mr={2}/>
                            Switch accounts
                        </MenuItem>
                        <Divider></Divider>
                        <MenuItem key="log-out">
                            Log out
                        </MenuItem>
                    </DropDown>
                </Flex>
            </Flex>
        </Flex>
    );
}