import { createGlobalStyle } from "styled-components";
import InterExtraBold from "../assets/fonts/InterExtraBold.ttf";
import InterBold from "../assets/fonts/InterBold.ttf";
import InterSemiBold from "../assets/fonts/InterSemiBold.ttf";
import InterMedium from "../assets/fonts/InterMedium.ttf";
import InterRegular from "../assets/fonts/InterRegular.ttf";
import InterLight from "../assets/fonts/InterLight.ttf";

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
