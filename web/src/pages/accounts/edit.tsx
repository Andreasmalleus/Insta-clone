import React from 'react'
import { Flex, Box, Icon, Text, Button } from '@chakra-ui/react';
import { Settings } from '../../components/Settings';
import { FiUser } from 'react-icons/fi';
import { Formik, Form } from 'formik';
import { InputField } from '../../components/InputField';

interface EditProps {
    selected : string
}

export const Edit: React.FC<EditProps> = ({}) => {
    
    return (
        <Settings selected="Edit profile">
           <Flex direction="column" mt={6} alignItems="center">
                <Box maxW="600px">
                    <Formik
                        initialValues={{
                            fullName : '',
                            username : '',
                            website : '',
                            bio : '',
                            email : '',
                            phoneNumber : '',
                            gender : '',
                        }}
                        onSubmit={ async (values, {setErrors}) => {
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting, values }) => (
                            <Form>
                                <Flex direction="column">
                                    <Flex  mb={4} mx={4} alignItems="center" justify="flex-end">
                                        <Icon as={FiUser as any} w="40px" h="40px" mr={8}/>
                                        <Flex direction="column" w="300px" fontSize="15px" fontWeight="bold">
                                            <Text>
                                                Username
                                            </Text>
                                            <Text color="blue.500">
                                                Change Profile Picture
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Flex direction="column" alignItems="flex-end">
                                        <InputField name="fullName" label="Full name"/>
                                        <Text maxW="300px" mx={4} color="grey" fontSize="15px">
                                            Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                                        </Text>
                                        <Text maxW="300px" mx={4} mb={2} color="grey" fontSize="15px">
                                            You can only change your name twice within 14 days.
                                        </Text>
                                    </Flex>
                                    <InputField name="username" label="Username"/>
                                    <InputField name="website" label="Website"/>
                                    <InputField name="bio" textarea={true} label="Bio"/>
                                    <Flex direction="column" alignItems="flex-end">
                                        <Text maxW="300px" mx={4} mb={2} color="grey" fontSize="15px">
                                            Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.
                                        </Text>
                                        <InputField name="email" label="Email"/>
                                        <InputField name="phoneNumber" label="Phone Number"/>
                                    </Flex>
                                    <Flex justify="flex-end">
                                        <Button 
                                            type="submit" 
                                            colorScheme="teal" 
                                            isLoading={isSubmitting} 
                                            mx={4}
                                            mb={6}
                                            w="300px"
                                        >
                                            Submit
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Flex>
        </Settings>
    );
}

export default Edit;