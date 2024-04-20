import React from "react";
import Router from "shared/Router";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ChakraProvider>
    </>
  );
}

export default App;
