import React, { useState } from 'react'
import { Flex, Button, Box, Input, Text, Image, Heading} from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { getUrlFromFileReader } from '../utils/getUrlFromFileReader';

interface CreateProps {

}

const Create: React.FC<CreateProps> = ({}) => {

    const [imageUrl, setImageUrl] = useState(null);

    const FETCH_POSTS = gql`
        query getPosts{
            posts{
                id,
                description,
                url,
                type,
                creator{
                    id,
                    url,
                    username,
                }
            }
        }
    `

    const [createPost] = useMutation(gql`
        mutation CreatePost($file: Upload!, $description: String!){
            createPost(file : $file, description : $description){
                id,
                description,
                url,
                type,
                creator{
                    id,
                    url,
                    username,
                }
            }
        }
    `) 

    const router = useRouter();

    return (
        <Layout> 
            <Wrapper variant="small">
                <Flex w="100%" maxH="800px" bg="white" border="1px" borderColor="lightgrey" borderRadius="3px" justify="center" alignItems="center" direction="column">
                    <Heading my={2}>Create your post</Heading>
                    <Box mt={4}>
                        <Formik
                            initialValues={{
                                description : '',
                                file : null
                            }}
                            onSubmit={async (values, {setErrors}) => {
                                const result = await createPost({
                                    variables : {
                                        ...values
                                    },
                                    update : (cache, mutationResult) => {
                                        const post = mutationResult.data.createPost;
                                        const { posts } = cache.readQuery({
                                            query : FETCH_POSTS
                                        })
                                        cache.writeQuery({
                                            query : FETCH_POSTS,
                                        data : {posts : [...posts, post]}
                                        })
                                    }
                                })
                                if(result){
                                    router.push('/');
                                }
                            }}
                        >
                            {({ isSubmitting , setFieldValue}) => (
                                <Form encType='multipart/form-data'>
                                    <Flex direction="column" alignItems="flex-end">
                                        <InputField name="description" label="Description"/>
                                        <Box position="relative" w="55px"h="25px" textAlign="left" mr={4} mb={4}>
                                            <Text color="blue.500">Upload</Text>
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
                                                        if(type.includes("image") || type.includes("video")){
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
                                        {
                                            imageUrl
                                            ?
                                            <Box  maxW="650px" maxH="600px" mr={4} mb={4}>
                                                <Image src={imageUrl} objectFit="contain"/>
                                            </Box>
                                            :
                                            null
                                        }
                                        <Button 
                                            type="submit" 
                                            colorScheme="teal" 
                                            isLoading={isSubmitting} 
                                            mx={4}
                                            mb={6}
                                            w="100px"
                                        >
                                            Create
                                        </Button>
                                    </Flex>
                                </Form>
                            )}                       
                        </Formik>
                    </Box>
                </Flex>
            </Wrapper>  
        </Layout>
    );
}

export default Create;