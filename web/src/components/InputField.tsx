import { Box, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react'
import { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    placeholder : string,
    name : string
}

export const InputField: React.FC<InputFieldProps> = ({size : _,...props}) => {

    const [field, {error}] = useField(props)

    return (
        <Box mb={4} mx={4}>
            <FormControl isInvalid={!!error}>
                <Input {...field} {...props} id={field.name}/>
                {error ?  <FormErrorMessage>{error}</FormErrorMessage> : null}
            </FormControl>
        </Box>
    );
}
