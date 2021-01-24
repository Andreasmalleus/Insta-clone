import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { User } from "../components/User";
import { Post } from "../components/Post";
import { Story } from "../components/Story";
import { users, posts } from "../mockData";
import { Suggestion } from "../components/Suggestion";

const Index = () => {
  return (
    <Flex direction="column" alignItems="center" bg="whitesmoke">
      <NavBar />
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
              <Box className="posts" maxW="650px">
                <Flex direction="column">
                    {posts.map(post => (
                      <Post key={post.id} {...post}></Post>
                    ))}
                </Flex>
              </Box>
            </Box>
          </Flex>
          <Flex direction="column" flexShrink={1} w="100%" maxW="300px">
            <User/>
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
    </Flex>
  )
};

export default Index
