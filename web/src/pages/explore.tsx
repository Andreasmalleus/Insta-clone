import React from 'react'
import { Flex, Box } from '@chakra-ui/react';
import { NavBar } from '../components/NavBar';
import { Wrapper } from '../components/Wrapper';
import { posts } from "../mockData";


interface ExploreProps {

}

export const Explore: React.FC<ExploreProps> = ({}) => {
    return (
        <Flex direction="column" alignItems="center" bg="whitesmoke">
            <NavBar />
            <Wrapper variant="regular">
                <Flex direction="column" width="100%">
                    <Flex flexWrap="wrap" mt={6} className="posts" justify="space-between">
                        {posts.map((post,i) => (
                            <Box key={i} bg="tomato" width="31%" h="300px" mb={8}>
                            </Box>
                        ))}
                    </Flex>
                </Flex>
            </Wrapper>  
        </Flex>
    );
}

export default Explore