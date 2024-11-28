import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`  
  html, body {
    margin: 0;
    padding: 0;
    display: flex;
    height: 100vh;
    overflow-x: hidden; 
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE 및 Edge 용 스크롤 바 숨김 */
    &::-webkit-scrollbar {
      display: none; /* Chrome 및 Safari 용 스크롤 바 숨김 */
    }
  }
`;

export default GlobalStyle;
