import { gql, useQuery } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
import { Story } from "../components/Story";
import { Suggestion } from "../components/Suggestion";
import { User } from "../components/User";
import { Wrapper } from "../components/Wrapper";
import { users } from "../mockData";
import { FETCH_POSTS, FETCH_ME } from "../graphql/queries";

const Index = () => {

  const { data : posts} = useQuery(FETCH_POSTS, {
    variables : {
      limit : 2
    }
  });  

  const {data, loading, error} = useQuery(FETCH_ME)
  
  return (
    <Layout>
        <Wrapper variant="regular">
          <Flex direction="column" flexGrow={3} >
            <Box mr={6}>
            <Box className="stories" maxW="650px" h="100px" border="1px" borderColor="lightgrey" borderRadius={4} mx={1} bg="white">
                <Flex justify="center" h="100%" overflow="auto" flexWrap="wrap" flexDirection="column">
                    {users.map(story => (
                      <Story key={story.id} {...story}></Story>
                    ))}
                </Flex>
            </Box>
              {
              !posts ?
                <div>No posts</div>
              :
              <Box className="posts" maxW="650px">
                <Flex direction="column">
                    {posts.posts.map(post => (
                      <Post key={post.id} {...post} userId={data?.me.id}></Post>
                    ))}
                </Flex>
              </Box>  
            }
            </Box>
          </Flex>
          <Flex direction="column" flexShrink={1} w="100%" maxW="300px">
            {
              !data?.me ? 
              <div>asdas</div>
              :<User />
            }
            <Box className="suggestions">
              <Flex justifyContent="space-between" alignItems="center" fontSize="13px" mt={6} mb={2}>
                <Box color="grey">
                    Suggestions for you
                </Box>
                <Box fontWeight="bold">
                    See All
                </Box>
              </Flex>
              {users.slice(0,4).map(suggestion => (
                <Suggestion key={suggestion.id} {...suggestion}></Suggestion>
              ))}
          </Box>
          </Flex>
        </Wrapper>
    </Layout>
  )
};

export default Index
