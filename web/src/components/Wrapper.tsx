import React from 'react'
import { Flex } from '@chakra-ui/react';

type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
    variant? : WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({children, variant = 'regular'}) => {
    return (
        <Flex w="100%" maxW={variant === 'regular' ? "950px" : "750px"} mt={6}>
          {children}
        </Flex>
    );
}