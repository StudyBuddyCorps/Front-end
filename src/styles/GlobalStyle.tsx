import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`  
  body {
    margin: 0;
    padding: 0;
    overflow-y: auto;
    -ms-overflow-style: none; /* IE 및 Edge 용 스크롤 바 숨김 */
    &::-webkit-scrollbar {
      display: none; /* Chrome 및 Safari 용 스크롤 바 숨김 */
    }
  }

  #root {
    display: flex;
  }
`;

export default GlobalStyle;
