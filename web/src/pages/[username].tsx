import React from 'react'
import { useRouter } from 'next/router';
import { NavBar } from '../components/NavBar';
import { Flex, Icon, Box, Button, Divider, IconButton } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { FiUser, FiSettings } from "react-icons/fi";
import { posts } from "../mockData";
import { BsPersonCheckFill, BsThreeDots } from 'react-icons/bs';

interface AccountProps{
    
}

const Account : React.FC<AccountProps> = ({}) => {

    const router = useRouter();
    const { username, isMe } = router.query;
    
    return (
        <Flex direction="column" alignItems="center" bg="whitesmoke">
            <NavBar />
            <Wrapper variant="regular">
                <Flex direction="column" width="100%">
                    <Flex width="80%" justify="center" alignItems="center" mb={6}>
                        <Box>
                            <Icon as={FiUser as any} w="150px" h="150px" mr={10}/>
                        </Box>
                        <Flex direction="column" maxW="300px" minW="100px" width="100%">
                            <Flex alignItems="center" mb={3} justify="space-between">
                                <Box fontSize="30px" mr={2}>{username}</Box>
                                {isMe ? 
                                    <>
                                        <Button 
                                        size="ms" 
                                        bg="whitesmoke" 
                                        border="1px" 
                                        borderColor="lightgrey" 
                                        p="4px"
                                        onClick={() => {
                                            router.push('/accounts/edit')
                                        }}
                                        >
                                            Edit profile
                                        </Button>
                                        <IconButton as={FiSettings} w="25px" h="25px" aria-label="settings" bg="none"></IconButton>    
                                    </>
                                    :
                                    <>
                                        <Box border="1px" borderColor="lightgrey" w="75px" borderRadius="4px" mr={2}>
                                            <IconButton as={BsPersonCheckFill} w="100%" h="25px" aria-label="following" bg="none"/>    
                                        </Box>
                                        <Icon as={BsThreeDots as any} w="20px" h="20px"/>
                                    </>
                                }
                            </Flex>
                            <Flex alignItems="center" mb={3} justify="space-between">
                                <Flex>
                                    <Box fontWeight="bold" mr={1}>8</Box>
                                    <Box mr={1}>posts</Box>
                                </Flex>
                                <Flex>
                                    <Box fontWeight="bold" mr={1}>155</Box>
                                    <Box mr={1}>followers</Box>
                                </Flex>
                                <Flex>
                                    <Box fontWeight="bold" mr={1}>147</Box>
                                    <Box mr={1}>following</Box>
                                </Flex>                    
                            </Flex>
                            <Flex direction="column">
                                <Box fontWeight="bold">Nickname</Box>
                                <Box>Description</Box>                        
                            </Flex>
                        </Flex>
                    </Flex>
                    <Divider/>
                    <Flex flexWrap="wrap" mt={6} className="posts" justify="space-between">
                        {posts.slice(0,7).map((post,i) => (
                            <Box key={i} bg="tomato" width="31%" h="300px" mb={8}>
                            </Box>
                        ))}
                    </Flex>
                </Flex>
            </Wrapper>  
        </Flex>
    );
}

export default Account;