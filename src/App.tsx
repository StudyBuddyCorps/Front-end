import React from "react";
import Router from "shared/Router";
import CalendarProvider from "state/CalendarContext";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";

function App() {
  return (
    <>
      <CalendarProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </CalendarProvider>
    </>
  );
}

export default App;
