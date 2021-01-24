import { Box, FormControl, FormErrorMessage, Input, FormLabel, Flex, ComponentWithAs, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { Component } from 'react'
import { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    placeholder? : string,
    name : string,
    label? : string,
    textarea? : boolean
}

export const InputField: React.FC<InputFieldProps> = ({size : _, label,textarea,...props}) => {

    const [field, {error}] = useField(props);

    let InputOrTextarea : ComponentWithAs<any, any>= Input
    if(textarea){
        InputOrTextarea = Textarea;
    }

    return (
        <Box mb={4} mx={4}>
            <FormControl isInvalid={!!error}>
                {
                    label 
                    ? 
                        <Flex justify="flex-end">
                            <FormLabel mr={8}>{label}</FormLabel>
                            <Flex direction="column">
                                <InputOrTextarea {...field} {...props} id={field.name} w="300px"/>
                                {error ?  <FormErrorMessage>{error}</FormErrorMessage> : null}
                            </Flex>
                        </Flex>
                    :
                        <>
                            <InputOrTextarea {...field} {...props} id={field.name}/>
                            {error ?  <FormErrorMessage>{error}</FormErrorMessage> : null}
                        </>
                    }
            </FormControl>
        </Box>
    );
}
