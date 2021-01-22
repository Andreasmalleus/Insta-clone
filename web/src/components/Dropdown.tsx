import React from 'react'
import { MenuButton, MenuList, IconButton, Icon, Menu } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib/cjs';

interface DropDownProps {
    icon : IconType;
    margin? : number;
}

export const DropDown: React.FC<DropDownProps> = ({children, icon, margin = 0}) => {
    return (
        <Menu placement="bottom-end" id="activity-dropdown">
            <MenuButton as={IconButton} bg="white" mr={margin} id="activity-button">
                <Icon as={icon} w="25px" h="25px"/>
            </MenuButton>
            <MenuList fontSize="14px" id="activity-dropdown">
               {children}
            </MenuList>
        </Menu>
    );
}