import React from 'react'
import { DropDown } from '.';
import { FiUser, FiSettings } from 'react-icons/fi';
import { MenuItem, Icon, Divider } from '@chakra-ui/react';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useMutation, gql, useApolloClient } from '@apollo/client';
import { pushToProfile } from '../../utils/pushToProfile';

interface UserDropdownProps {
    id : number;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({id}) => {

    const router = useRouter();

    const [logout] = useMutation(gql`
        mutation Logout{
            logout
        }
    `)  

    const apollo = useApolloClient();

    return (
        <DropDown icon={FiUser}>
            <MenuItem onClick={() => 
                pushToProfile(router, id)
            }>
                <Icon as={FiUser as any} w="20px" h="20px" mr={2}/>
                Profile
            </MenuItem>
            <MenuItem onClick={() => {
                router.push('/accounts/edit')
            }}> 
                <Icon as={FiSettings as any} w="20px" h="20px" mr={2}/>
                Settings
            </MenuItem>
            <MenuItem>
                <Icon as={HiSwitchHorizontal as any} w="20px" h="20px" mr={2}/>
                Switch accounts
            </MenuItem>
            <Divider></Divider>
            <MenuItem key="log-out" onClick={async () => {
                await logout();
                await apollo.cache.reset()
                router.push('/login');
            }}>
                Log out
            </MenuItem>
        </DropDown>
    );
}