import React from 'react'
import { DropDown } from '.';
import { AiOutlineHeart } from 'react-icons/ai';
import { MenuItem, Flex, Icon, Box, Divider } from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { users } from '../../mockData';

interface ActivityDropdownProps {

}

export const ActivityDropdown: React.FC<ActivityDropdownProps> = ({}) => {

    const router = useRouter();

    const activities = users.slice(0,3)

    return (
        <DropDown icon={AiOutlineHeart} mr={2}>
            {activities.map((user, index) => (
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
                    {index != activities.length - 1 ? <Divider/> : null}
                </React.Fragment>
            ))}
        </DropDown>
    );
}