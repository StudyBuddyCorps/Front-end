import React from "react";
import styled from "styled-components";
import theme from "styles/theme";

interface SettingTabProps {
  tabs: string[];
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const SettingTab: React.FC<SettingTabProps> = ({
  tabs,
  selectedTab,
  onSelectTab,
}: SettingTabProps) => {
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
  width: 200px;
  height: 88vh;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 15px 0 0 15px;
  background-color: #f5f5f5;
`;

const TabButton = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  background-color: ${({ $isSelected }) =>
    $isSelected ? theme.colors.white02 : theme.colors.white01};
  border: none;
  cursor: pointer;
  border-radius: 15px 0 0 15px;
  color: ${({ $isSelected }) =>
    $isSelected ? theme.colors.subMain : theme.colors.black02};
  font-size: 20px;
  font-family: NotoSansSemiBold;
  padding: 20px 26px;
  text-align: left;
`;

export default SettingTab;
