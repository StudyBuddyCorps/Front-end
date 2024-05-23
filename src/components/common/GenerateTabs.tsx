import React, { useState, ReactElement } from "react";
import GenerateTab from "./GenerateTab";
import styled from "styled-components";

interface GenerateTabsProps {
  children: React.ReactNode;
}

const GenerateTabs: React.FC<GenerateTabsProps> = ({
  children,
}: GenerateTabsProps) => {
  const childrenArray = React.Children.toArray(children) as ReactElement[];
  const [selectedTab, setSelectedTab] = useState<string>(
    childrenArray[0].props.title
  );

  const handleTabSelect = (title: string) => {
    setSelectedTab(title);
  };

  return (
    <>
      <TabBar>
        {childrenArray.map((child) => (
          <GenerateTab
            key={child.props.title}
            title={child.props.title}
            onSelectTab={handleTabSelect}
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
  padding: 20px;
  background-color: #ffffff;
  border: none;
  border-radius: 0 15px 15px 0;
  box-sizing: border-box;
`;

export default GenerateTabs;
