import React from 'react'
import { Box, Flex, Icon, IconButton, Link, Spinner } from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client';
import { pushToProfile } from '../utils/pushToProfile';

interface UserProps {
}

export const User: React.FC<UserProps> = ({}) => {

    const router = useRouter();

    const {data, loading, error} = useQuery(gql`
        query Me{
            me{
                id,
                username,
            }
        }
    `)

    const [logout] = useMutation(gql`
        mutation Logout{
            logout
        }
    `)  

    const apollo = useApolloClient();

    if(loading){
        return <Spinner></Spinner>
    }else if(error){
        return <div>error</div>
    }else{
        return (
            <Box className="user" mt={6} width="100%">
                <Flex alignItems="center" width="100%" justifyContent="space-between">
                <Box mr={2}>
                    <Flex alignItems="center">
                        <Box>
                            <Icon as={FiUser as any}w="55px" h="55px" mr={1} aria-label="user-image" bg="none" onClick={() => pushToProfile(router, data.me.username)} cursor="pointer"/>
                        </Box>
                        <Link mr={2} onClick={() => pushToProfile(router, data.me.username)}>
                            {data.me.username}
                        </Link>
                    </Flex>
                </Box>
                <Link 
                    color="coral" 
                    fontWeight="bold" 
                    fontSize="12px" 
                    cursor="pointer"
                    onClick={async () => {
                        await logout();
                        await apollo.cache.reset();
                        router.push('/login');
                    }}
                >
                    Log out
                </Link>
                </Flex>
            </Box>
        )
    }
}