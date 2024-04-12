import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face{
    font-family: 'Inter SemiBold';
    src : url(./styles/fonts/Inter-SemiBold.ttf) format('truetype');
  }

  @font-face{
    font-family: 'Inter Medium';
    src : url(./styles/fonts/Inter-Medium.ttf) format('truetype');
  }

  @font-face{
    font-family: 'Inter Regular';
    src : url(./styles/fonts/Inter-Regular.ttf) format('truetype');
  }

  @font-face{
    font-family: 'Inter Light';
    src : url(./styles/fonts/Inter-Light.ttf) format('truetype');
  }

  @font-face{
    font-family: 'Inter Bold';
    src : url(./styles/fonts/Inter-Bold.ttf) format('truetype');
  }
 
  @font-face{
    font-family: 'Inter ExtraBold';
    src : url(./styles/fonts/Inter-ExtraBold.ttf) format('truetype');
  }
  
  body {
    margin: 0;
    padding: 0;
  }

  #root {
    display: flex;
  }
`;

export default GlobalStyle;
