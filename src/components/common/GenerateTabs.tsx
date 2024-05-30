import React, { useState, ReactElement } from "react";
import GenerateTab from "./GenerateTab";
import styled from "styled-components";

interface GenerateTabsProps {
  children: React.ReactNode;
  selectedTab: string;
  handleSelectTab: (title: string) => void;
}

const GenerateTabs: React.FC<GenerateTabsProps> = ({
  children,
  selectedTab,
  handleSelectTab,
}: GenerateTabsProps) => {
  const childrenArray = React.Children.toArray(children) as ReactElement[];

  return (
    <>
      <TabBar>
        {childrenArray.map((child) => (
          <GenerateTab
            key={child.props.title}
            title={child.props.title}
            onSelectTab={handleSelectTab}
            selectedTab={selectedTab}
          />
        ))}
      </TabBar>
      <TabContent>
        {childrenArray.map((child) =>
          child.props.title === selectedTab ? child.props.children : null
        )}
      </TabContent>
    </>
  );
};

const TabBar = styled.div`
  display: flex;
  width: 200px;
  height: 88vh;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 15px 0 0 15px;
  background-color: ${({ theme }) => theme.colors.white01};
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 45vw;
  height: 88vh;
  padding: 6vh 30px 30px 30px;
  background-color: #ffffff;
  border: none;
  border-radius: 0 15px 15px 0;
  box-sizing: border-box;
`;

export default GenerateTabs;
