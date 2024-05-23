import React from "react";
import styled from "styled-components";

interface GenerateLayoutProps {
  children: React.ReactNode;
}

const GenerateLayout: React.FC<GenerateLayoutProps> = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

const LayoutContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black02};
  align-items: center;
  justify-content: center;
`;

export default GenerateLayout;
