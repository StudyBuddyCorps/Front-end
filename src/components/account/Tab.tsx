import React from "react";
import styled from "styled-components";

interface TabProps {
  tabs: string[];
  selectedTab: string;
  onSelectTab: (tab: string) => void;

}

const Tab: React.FC<TabProps> = ({ tabs, selectedTab, onSelectTab }: TabProps) => {
  return (
    <Wrapper>
      {tabs.map((tab) => (
        <TabButton
          key={tab} 
          onClick={() => onSelectTab(tab)}
          $isSelected={tab === selectedTab}
        >
          {tab}
        </TabButton>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 36vw;
  height: 50px;
  border: none;
  border-radius: 15px 15px 0 0;
  background-color: #ECECEC;
`;

const TabButton = styled.button<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) => ($isSelected ? '#FFFFFF' : '#ECECEC')};
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 15px 15px 0 0;
  width: 18vw;
  color: ${({ $isSelected }) => ($isSelected ? '#586FC5' : '#000000')};
  font-size: ${({ $isSelected }) => ($isSelected ? '20px' : '16px')};
  font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '500')};
`;


export default Tab;