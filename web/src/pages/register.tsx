import { Box, Button, Flex, Input, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik';
import React from 'react'
import { InputField } from '../components/InputField';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { validateRegister } from '../utils/validateRegister';
import { checkIfSomeFieldsAreEmpty } from '../utils/checkFields';

interface LoginProps {

}

const Login: React.FC<LoginProps> = ({}) => {

    const [register] = useMutation(gql`
        mutation Register($options : RegisterInput!){
            register(options : $options){
                user{
                    id,
                    username,
                }
                error{
                    field,
                    message
                }
            }
        }
    `)

    const router = useRouter();

    return (
        <Flex bg="#FAFAFA" h="100%" w="100%" justify="center" align="center" direction="column">
            <Box bg="white" width="350px" borderWidth="1px">
                <Box mx={2} my={8} textAlign="center" fontSize="30px">
                    ɪɴꜱᴛᴀᴄʟᴏɴᴇ
                </Box>
                <Formik
                    initialValues={{
                        email : '',
                        fullName : '',
                        username : '',
                        password : ''
                    }}
                    onSubmit={async (values, {setErrors}) => {
                        const validationErrors = validateRegister(values)
                        if(!validationErrors){
                            const response = await register({variables : {
                                options : values
                            }})
                            const error = response.data.register.error;
                            if(!error){
                                return router.push('/');
                            }
                            return setErrors({
                                [error.field] : error.message
                            })
                        }                           
                        return setErrors({
                            [validationErrors.error.field] : [validationErrors.error.message]
                        })
                        
                    }}
                >
                    {({ isSubmitting,values }) => (
                        <Form>
                            <Flex direction="column">
                                <InputField placeholder="Email" name="email"/>
                                <InputField placeholder="Full Name" name="fullName"/>
                                <InputField placeholder="Username" name="username"/>
                                <InputField placeholder="Password" name="password" type="password"/>
                                <Button 
                                    type="submit" 
                                    colorScheme="teal" 
                                    isLoading={isSubmitting} 
                                    mx={4} 
                                    isDisabled={checkIfSomeFieldsAreEmpty(values)}
                                >
                                    Submit
                                </Button>
                            </Flex>
                        </Form>
                    )}
                </Formik>
                <Box mx={2} my={4} textAlign="center" fontSize="13px" color="grey">
                    By signing up, you agree to our Terms . 
                    Learn how we collect, use and share your data in our Data Policy 
                    and how we use cookies and similar technology in our Cookies Policy .
                </Box>
            </Box>
            <Box bg="white" w="350px" h="75px" borderWidth="1px" mt={4} d="flex" justifyContent="center" alignItems="center">
                <Flex fontSize="15px">
                    Have an account? 
                    <NextLink href="/login">
                        <Link ml={1}>Log in</Link>
                    </NextLink>
                </Flex>
            </Box>
        </Flex>
    );
}

export default Login