import { gql, useMutation, useQuery } from '@apollo/client';
import { Avatar, Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Settings } from '../../components/Settings';
import { checkIfAllFieldsAreEmpty } from '../../utils/checkFields';
import { getUrlFromFileReader } from '../../utils/getUrlFromFileReader';

interface EditProps {
    selected : string
}

export const Edit: React.FC<EditProps> = ({}) => {

    const {data} = useQuery(gql`
    query Me{
        me{
            id,
            username,
            url
        }
        }
    `)

    const [uploadProfileImage] = useMutation(gql`
        mutation UploadProfileImage($file : Upload!){
            uploadProfileImage(file: $file){
                id,
                url
            }
        }
    `)

    const [imageUrl, setImageUrl] = useState(null);
    
    return (
        <Settings selected="Edit profile">
           <Flex direction="column" mt={6} alignItems="center">
                <Box maxW="600px">
                    <Formik
                        initialValues={{
                            file : '',
                            fullName : '',
                            username : '',
                            website : '',
                            bio : '',
                            email : '',
                            phoneNumber : '',
                            gender : '',
                        }}
                        onSubmit={ async (values, {setErrors}) => {
                            if(values.file){
                                await uploadProfileImage({
                                    variables : {
                                        file : values.file
                                    },
                                    update : (cache, mutationResult) => {
                                        const {id, url} = mutationResult.data.uploadProfileImage;
                                        cache.writeFragment({
                                            id : `User:${id}`,
                                            fragment : gql`
                                                fragment MyUser on User {
                                                    url
                                                }
                                            `,
                                            data : {
                                                url
                                            }
                                        })
                                    }
                                })
                            }
                        }}
                    >
                        {({ isSubmitting, values,setFieldValue }) => (
                            <Form>
                                <Flex direction="column">
                                    <Flex mb={4} mx={4} alignItems="center" justify="flex-end">
                                        {
                                            data?.me.url == ""?
                                            <Avatar w="60px" h="60px" mr={6} bg="black"/>
                                            :
                                            <Avatar src={imageUrl ? imageUrl : data?.me.url}  w="60px" h="60px" mr={6}/>
                                        }
                                        <Flex direction="column" w="300px" fontSize="15px" fontWeight="bold" justify="center">
                                            <Text>
                                                {data?.me.username}
                                            </Text>
                                            <Box position="relative" w="150px"h="25px" textAlign="left">
                                                <Text color="blue.500">Edit profile picture</Text>
                                                <Input 
                                                    type="file" 
                                                    opacity="0.0" 
                                                    position="absolute" 
                                                    top="0" left="0" 
                                                    right="0" bottom="0"
                                                    w="100%" h="25px"
                                                    onChange={async ({target : {validity, files: [file]}}) => {
                                                        if(validity.valid){
                                                            const type = file.type;
                                                            if(type.includes("image")){
                                                                setFieldValue("file", file)
                                                                try{
                                                                    const url = await getUrlFromFileReader(file);
                                                                    setImageUrl(url)
                                                                }catch(e){
                                                                    console.log(e)
                                                                }
                                                            }else{
                                                                console.log("needs to be an image or video")
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Box>
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
                                            isDisabled={checkIfAllFieldsAreEmpty(values)}
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