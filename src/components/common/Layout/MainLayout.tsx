import React from "react";
import styled from "styled-components";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <main>{children}</main>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  margin: 0 0 0 100px;
  main {
    display: flex;
    flex-direction: column;
  }
`;

export default MainLayout;
