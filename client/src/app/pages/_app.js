// pages/_app.js
import store from '@/redux/store';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from "react-redux";


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    </Provider>
  )
}

export default MyApp;