import { DefaultTheme } from "styled-components";

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

export type Colors = typeof colors;

const theme: DefaultTheme = {
  colors,
};

export default theme;
