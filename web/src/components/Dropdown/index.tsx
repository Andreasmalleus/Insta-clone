import React, { useState } from 'react'
import { MenuButton, MenuList, IconButton, Icon, Menu, Box } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib/cjs';

interface DropDownProps {
    icon : IconType;
    mr? : number;
}

export const DropDown: React.FC<DropDownProps> = ({children, icon, mr = 0}) => {

    const [isSelected, setIsSelected] = useState<true | false>();

    return (
        <Menu placement="bottom-end" id="activity-dropdown">
            <MenuButton as={IconButton} bg="none" mr={mr} id="activity-button">
                <Icon as={icon} w="25px" h="25px"/>
            </MenuButton>
            <MenuList fontSize="14px" id="activity-dropdown" zIndex="2">
            {children}
            </MenuList>
        </Menu>
    );
}