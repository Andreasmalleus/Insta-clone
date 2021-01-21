import { Box, Flex } from '@chakra-ui/react';
import { Media } from "./Media";

interface MediaListProps {

}

export const MediaList: React.FC<MediaListProps> = ({}) => {
    return (
        <Box className="media" maxW="650px">
            <Flex direction="column">
                <Media></Media>
                <Media></Media>
            </Flex>
        </Box>
    );
}
