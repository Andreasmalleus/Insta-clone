import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, Input, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik';
import React from 'react'
import { InputField } from '../components/InputField';
import NextLink from "next/link";

interface LoginProps {

}

const Login: React.FC<LoginProps> = ({}) => {
    return (
        <Flex bg="#FAFAFA" h="100%" w="100%" justify="center" align="center" direction="column">
            <Box bg="white" width="350px" borderWidth="1px">
                <Box mx={2} my={8} textAlign="center" fontSize="30px">
                    ɪɴꜱᴛᴀᴄʟᴏɴᴇ
                </Box>
                <Formik
                    initialValues={{
                        emailOrUsername : '',
                        password : ''
                    }}
                    onSubmit={(values, {setErrors}) => {
                        console.log({ values });
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Flex direction="column">
                                <InputField placeholder="Email or Username" name="emailOrUsername"/>
                                <InputField placeholder="Password" name="password" type="password"/>
                                <Button type="submit" colorScheme="teal" isLoading={isSubmitting} mb={2} mx={4}>Submit</Button>
                            </Flex>
                        </Form>
                    )}
                </Formik>
                <Box mx={2} my={4} textAlign="center" fontSize="13px">
                    <Link>Forgot password?</Link>
                </Box>
            </Box>
            <Box bg="white" w="350px" h="75px" borderWidth="1px" mt={4} d="flex" justifyContent="center" alignItems="center">
                <Flex>
                    Dont have an account? 
                    <NextLink href="/register">
                        <Link ml={1}>Sign up</Link>
                    </NextLink>
                </Flex>
            </Box>
        </Flex>
    );
}

export default Login