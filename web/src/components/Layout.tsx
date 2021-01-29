import React from 'react'
import { Flex } from '@chakra-ui/react'
import { NavBar } from './NavBar'


export const Layout: React.FC = ({children}) => {
    return (
        <Flex direction="column" alignItems="center" bg="whitesmoke" minH="100%">
            <NavBar />
            {children}
        </Flex>
    );
}