import { createGlobalStyle } from "styled-components";
import InterExtraBold from "../assets/fonts/InterExtraBold.ttf";
import InterBold from "../assets/fonts/InterBold.ttf";
import InterSemiBold from "../assets/fonts/InterSemiBold.ttf";
import InterMedium from "../assets/fonts/InterMedium.ttf";
import InterRegular from "../assets/fonts/InterRegular.ttf";
import InterLight from "../assets/fonts/InterLight.ttf";
import NotoSansExtraBold from "../assets/fonts/NotoSansExtraBold.ttf";
import NotoSansBold from "../assets/fonts/NotoSansBold.ttf";
import NotoSansSemiBold from "../assets/fonts/NotoSansSemiBold.ttf";
import NotoSansMedium from "../assets/fonts/NotoSansMedium.ttf";
import NotoSansRegular from "../assets/fonts/NotoSansRegular.ttf";
import NotoSansLight from "../assets/fonts/NotoSansLight.ttf";

const GlobalStyle = createGlobalStyle`
@font-face{
  font-family: 'InterExtraBold';
  src : url(${InterExtraBold}) format('truetype');
}

@font-face{
  font-family: 'InterBold';
  src : url(${InterBold}) format('truetype');
}

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
    font-family: 'NotoSansBold';
    src : url(${NotoSansBold}) format('truetype');
  }
 
  @font-face{
    font-family: 'NotoSansExtraBold';
    src : url(${NotoSansExtraBold}) format('truetype');
  }

  @font-face{
    font-family: 'NotoSansSemiBold';
    src : url(${NotoSansSemiBold}) format('truetype');
  }

  @font-face{
    font-family: 'NotoSansMedium';
    src : url(${NotoSansMedium}) format('truetype');
  }

  @font-face{
    font-family: 'NotoSansRegular';
    src : url(${NotoSansRegular}) format('truetype');
  }

  @font-face{
    font-family: 'NotoSansLight';
    src : url(${NotoSansLight}) format('truetype');
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
