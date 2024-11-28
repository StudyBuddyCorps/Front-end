import React from "react";
import styled from "styled-components";

interface FooterProps {
  children: React.ReactNode;
  width?: string;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return <FooterContainer>{children}</FooterContainer>;
};

const FooterContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export default Footer;
