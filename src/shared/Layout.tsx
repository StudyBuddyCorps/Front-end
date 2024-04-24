import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar></Sidebar>
      <main>{children}</main>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  position: absolute;
  right: 0;

  main {
    display: flex;
    flex-direction: column;
  }
`;

export default Layout;
