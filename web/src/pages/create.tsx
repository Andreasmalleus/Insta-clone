import React from 'react'
import { Flex, Button, Box} from '@chakra-ui/react';
import { NavBar } from '../components/NavBar';
import { Wrapper } from '../components/Wrapper';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';

interface CreateProps {

}

const Create: React.FC<CreateProps> = ({}) => {

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
                <Flex w="100%" h="400px" maxH="600px" bg="white" border="1px" borderColor="lightgrey" borderRadius="3px" justify="center" alignItems="center">
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
                                        <Box mb={4}>
                                        <InputField 
                                            type="file" 
                                            name="upload" 
                                            required 
                                            onChange={({target : {validity, files: [file]}}) => {
                                                if(validity.valid){
                                                    const type = file.type;
                                                    if(type.includes("video") || type.includes("image")){
                                                        setFieldValue("file", file)
                                                    }else{
                                                        console.log("needs to be an image or video")
                                                    }
                                                }
                                            }}/>
                                        </Box>
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