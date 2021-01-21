import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/NavBar";

const Index = () => {

  return (
    <Flex direction="column" alignItems="center" bg="whitesmoke">
      <NavBar />
        <Flex w="100%" maxW={"950px"} mt={6}>
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
        </Flex>
    </Flex>
  )
};

export default Index
