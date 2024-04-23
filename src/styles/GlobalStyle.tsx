import { createGlobalStyle } from "styled-components";
import InterExtraBold from "styles/fonts/InterExtraBold.ttf";
import InterBold from "styles/fonts/InterBold.ttf";
import InterSemiBold from "styles/fonts/InterSemiBold.ttf";
import InterMedium from "styles/fonts/InterMedium.ttf";
import InterRegular from "styles/fonts/InterRegular.ttf";
import InterLight from "styles/fonts/InterLight.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face{
    font-family: 'InterSemiBold';
    src : url(${InterSemiBold}) format('truetype');
  }

  @font-face{
    font-family: 'InterMedium';
    src : url(${InterMedium}) format('truetype');
  }

  @font-face{
    font-family: 'InterRegular';
    src : url(${InterRegular}) format('truetype');
  }

  @font-face{
    font-family: 'InterLight';
    src : url(${InterLight}) format('truetype');
  }

  @font-face{
    font-family: 'InterBold';
    src : url(${InterBold}) format('truetype');
  }
 
  @font-face{
    font-family: 'InterExtraBold';
    src : url(${InterExtraBold}) format('truetype');
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
