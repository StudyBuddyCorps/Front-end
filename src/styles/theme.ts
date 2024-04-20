import { extendTheme } from "@chakra-ui/react";

// define colors
const colors = {
  main: "#FFDA58",
  subMain: "#586FC5",
  highlight: "#FF007A",
  green: "#1497A9",
  white00: "#ECECEC",
  white01: "#F5F5F5",
  white02: "#FFFFFF",
  black00: "#131211",
  black01: "#181D24",
  black02: "#212E42",
  background: "#4A5058",
  background2: "#303237",
};

/*const fonts = {
  extraBold: "Inter ExtraBold",
  bold: "Inter Bold",
  semiBold: "Inter SemiBold",
  regular: "Inter Regular",
  medium: "Inter Medium",
  light: "Inter Light",
};*/

const theme = extendTheme({ colors });

export default theme;
