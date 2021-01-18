import { gql, useQuery } from "@apollo/client";
import { Box, Spinner } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/NavBar";

const Index = () => {

  const {loading, error, data} = useQuery(
    gql`
      query{
        posts{
          id,
          url,
          creator{
            username
          }
        }
      }
    `
  )


  let body;

  if(loading){
    body = (
      <Box>
        <Spinner></Spinner>
      </Box>
    )
  }

  if(data && !loading){
    body = (
      data.posts.map((post) => (
        <Box key={post.id}>{post.url}</Box>
      ))
    )
  }

  
  return (
    <>
      <NavBar />
      {body}
    </>
  )
};

export default Index
