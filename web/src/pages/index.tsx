import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";

const Index = () => {

  return (
    <Flex direction="column" alignItems="center" bg="whitesmoke">
      <NavBar />
        <Wrapper variant="regular">
          <Flex direction="column" flexGrow={3} >
            <Box mr={6}>
              Stories
              Medias
            </Box>
          </Flex>
          <Flex direction="column" flexShrink={1} w="100%" maxW="300px">
            User
            Suggestions
          </Flex>
        </Wrapper>
    </Flex>
  )
};

export default Index
