import { DefaultTheme } from "styled-components";

// define colors
const colors = {
  main: "#FFDA58",
  subMain: "#586FC5",
  highlight: "#FF007A",
  pink: "#FF007A80",
  green: "#1497A9",
  white00: "#ECECEC",
  white01: "#F5F5F5",
  white02: "#FFFFFF",
  black00: "#131211",
  black01: "#181D24",
  black02: "#212E42",
  black03: "#4A5058",
  background: "#4A5058",
  background2: "#303237",
  grey: "#ECECEC",
  grey2: "#CDCDCD",
  feeback01: "#FF5F76",
  feeback02: "#FD8755",
  feeback03: "#8CE27F",
  feeback04: "#26C7BD",
  graph01: "#9200FF",
  graph02: "#0095FF",
};

export type Colors = typeof colors;

const theme: DefaultTheme = {
  colors,
};

export default theme;
