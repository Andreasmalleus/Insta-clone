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
        <Settings selected="Change password">
           <Flex direction="column"mt={6} alignItems="center">
                <Box maxW="600px">
                    <Formik
                        initialValues={{
                            oldPassword : '',
                            newPassword : '',
                            cfmNewPassword : ''
                        }}
                        onSubmit={ async (values, {setErrors}) => {
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting, values }) => (
                            <Form>
                                <Flex direction="column">
                                    <Flex  mb={4} mx={4} justify="flex-end" alignItems="center">
                                        <Icon as={FiUser as any} w="40px" h="40px" mr={8}/>
                                        <Text w="300px" fontSize="20px" fontWeight="bold">
                                            Username
                                        </Text>
                                    </Flex>
                                    <InputField name="oldPassword" label="Old Password" type="password"/>
                                    <InputField name="newPassword" label="New Password" type="password"/>
                                    <InputField name="cfmNewPassword" label="Confirm New Password" type="password"/>
                                    <Flex direction="column" alignItems="flex-end">
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
                                        <Text mx={4}>Forgot password</Text>
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