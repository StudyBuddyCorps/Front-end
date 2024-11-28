import React from "react";
import styled from "styled-components";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

const LayoutContainer = styled.div`
  margin: 0 0 50px 100px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default MainLayout;
