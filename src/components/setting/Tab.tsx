import React from "react";
import styled from "styled-components";

interface TabProps {
  tabs: string[];
  selectedTab: string,
  onSelectTab: (tab: string) => void;
}

const Tab: React.FC<TabProps> = ({ tabs, selectedTab, onSelectTab }: TabProps) => {
  return (
    <TabContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab}
          onClick={() => onSelectTab(tab)}
          $isSelected={tab === selectedTab}
        >
          {tab}
        </TabButton>
      ))}
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  border: none;
  background-color: ${({ theme }) => (theme.colors.white02)};
  gap: 10px;
  padding: 0 43px;
`;

const TabButton = styled.button<{ $isSelected: boolean }>`
  background-color: transparent;
  padding: 10px;
  border: none;
  border-bottom: 2px solid ${({ $isSelected, theme}) => ($isSelected ?  theme.colors.subMain : `none`)};
  font-size: 20px;
  font-weight: 600;
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.subMain : '#000000' )};
`;

export default Tab;