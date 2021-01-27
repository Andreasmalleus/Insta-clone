import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import "../style.css"
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import theme from '../theme'
import { createUploadLink } from 'apollo-upload-client';


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link : createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials : 'include'
  })
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
