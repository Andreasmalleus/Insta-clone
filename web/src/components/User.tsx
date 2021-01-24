import React from 'react'
import { Box, Flex, Icon, IconButton, Link } from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

interface UserProps {
}

export const User: React.FC<UserProps> = ({}) => {

    const router = useRouter();

    const {data} = useQuery(gql`
        query Me{
            me{
                id,
                username,
            }
        }
    `)


    const pushToUserPage = () => {
        router.push({
            pathname : '/[username]',
            query : {username : "username"}
        })
    }
    
    return (
        <Box className="user" mt={6} width="100%">
            <Flex alignItems="center" width="100%" justifyContent="space-between">
            <Box mr={2}>
                <Flex alignItems="center">
                    <Box>
                        <Icon as={FiUser as any}w="55px" h="55px" mr={1} aria-label="user-image" bg="none" onClick={() => pushToUserPage()} cursor="pointer"/>
                    </Box>
                    <Link mr={2} onClick={() => pushToUserPage()}>
                        Username
                    </Link>
                </Flex>
                
            </Box>
            <Box color="coral" fontWeight="bold" fontSize="12px">
                Log out
            </Box>
            </Flex>
        </Box>
    );
}