import React from 'react'
import { useRouter } from 'next/router';
import { NavBar } from '../../components/NavBar';
import { Flex, Icon, Box, Button, Divider, IconButton, Image } from '@chakra-ui/react';
import { Wrapper } from '../../components/Wrapper';
import { FiUser, FiSettings } from "react-icons/fi";
import { BsPersonCheckFill, BsThreeDots } from 'react-icons/bs';
import { useQuery, gql } from '@apollo/client';
import { Layout } from '../../components/Layout';

interface ProfileProps{
    
}

const Profile : React.FC<ProfileProps> = ({}) => {

    const router = useRouter();
    const { id } = router.query;

    const {data, loading, error} = useQuery(gql`
        query Query($id : Int!){
            user(id : $id){
                id,
                username,
                posts{
                    id,
                    description,
                    url
                }
            }
            me{
                id
            }
        }
    `,
    {
        variables : {
            id : parseInt(id as string)
        }
    }
    )
    
    return (
        <Layout>
            <Wrapper variant="regular">
                <Flex direction="column" width="100%">
                    <Flex width="80%" justify="center" alignItems="center" mb={6}>
                        <Box>
                            <Icon as={FiUser as any} w="150px" h="150px" mr={10}/>
                        </Box>
                        <Flex direction="column" maxW="300px" minW="100px" width="100%">
                            <Flex alignItems="center" mb={3} justify="space-between">
                                <Box fontSize="30px" mr={2}>{data?.user.username}</Box>
                                {data?.me.id == data?.user.id ? 
                                    <>
                                        <Button 
                                        size="ms" 
                                        bg="whitesmoke" 
                                        border="1px" 
                                        borderColor="lightgrey" 
                                        p="4px"
                                        onClick={() => {
                                            router.push('/accounts/edit')
                                        }}
                                        >
                                            Edit profile
                                        </Button>
                                        <IconButton as={FiSettings} w="25px" h="25px" aria-label="settings" bg="none"></IconButton>    
                                    </>
                                    :
                                    <>
                                        <Box border="1px" borderColor="lightgrey" w="75px" borderRadius="4px" mr={2}>
                                            <IconButton as={BsPersonCheckFill} w="100%" h="25px" aria-label="following" bg="none"/>    
                                        </Box>
                                        <Icon as={BsThreeDots as any} w="20px" h="20px"/>
                                    </>
                                }
                            </Flex>
                            <Flex alignItems="center" mb={3} justify="space-between">
                                <Flex>
                                    <Box fontWeight="bold" mr={1}>8</Box>
                                    <Box mr={1}>posts</Box>
                                </Flex>
                                <Flex>
                                    <Box fontWeight="bold" mr={1}>155</Box>
                                    <Box mr={1}>followers</Box>
                                </Flex>
                                <Flex>
                                    <Box fontWeight="bold" mr={1}>147</Box>
                                    <Box mr={1}>following</Box>
                                </Flex>                    
                            </Flex>
                            <Flex direction="column">
                                <Box fontWeight="bold">Nickname</Box>
                                <Box>Description</Box>                        
                            </Flex>
                        </Flex>
                    </Flex>
                    <Divider/>
                   {data?.user.posts != [] ? 
                     <Flex flexWrap="wrap" mt={6} className="posts" justify="space-between">
                     {data?.user.posts.map((post,i) => (
                         <Box 
                             w="31%" h="300px" 
                             mb={8} key={post.id}
                             _hover={{opacity : 0.5}} 
                             cursor="pointer" 
                             onClick={() => router.push({
                                 pathname : "/post/[id]",
                                 query : {id : post.id}
                             })}
                         >
                         <Image src={post.url} h="100%" w="100%" objectFit="contain"/>
                     </Box>
                     ))}
                    </Flex>   
                    :
                    <Box>
                        There are no posts
                    </Box>
                    }
                </Flex>
            </Wrapper>  
        </Layout>
    );
}

export default Profile;