import React from 'react'
import { Flex, Box, Button } from '@chakra-ui/react';
import { NavBar } from './NavBar';
import { Wrapper } from './Wrapper'
import { useRouter } from 'next/router';
import { Layout } from './Layout';

interface SettingsProps {
    selected : string
}

export const Settings: React.FC<SettingsProps> = ({selected = "Edit profile", children}) => {

    const router = useRouter();

    const choices = [
        {
            name : 'Edit profile',
            route : 'edit'
        },
        {
            name : 'Change password',
            route : 'change'
        },
        {
            name : 'Apps and websites',
            route : 'access'
        },
        {
            name : 'Email and SMS',
            route : 'emails'
        },
        {
            name : 'Push Notifications',
            route : 'push'
        },
        {
            name : 'Manage Contacts',
            route : 'contacts'
        },
        {
            name : 'Privacy and Security',
            route : 'privacy'
        },
        {
            name : 'Login Activity',
            route : 'activity'
        },
        {
            name : 'Emails from Instagram',
            route : 'sent'
        },
    ]
    return (
        <Layout>
            <Wrapper variant="regular">
                <Box bg="white" w="100%" border="1px" borderColor="lightgrey" borderRadius="3px">
                    <Flex>
                        <Box minH="700px" borderRight="1px" borderColor="lightgrey" w="300px">
                            <Flex direction="column">
                                {choices.map((choice) => (
                                    <Button 
                                        p={4} 
                                        borderRadius="0" 
                                        borderLeft={selected === choice.name ? '2px' : null} 
                                        key={choice.name} 
                                        fontWeight={selected === choice.name ? 'bold' : null} 
                                        bg="none"
                                        onClick={() => router.push(`/accounts/${choice.route}`)}
                                    >
                                        {choice.name}
                                    </Button>
                                ))}
                            </Flex>
                        </Box>
                        <Box w="100%">
                            {children}
                        </Box>
                    </Flex>
                </Box>
            </Wrapper>
        </Layout>
    );
}

export default Settings;