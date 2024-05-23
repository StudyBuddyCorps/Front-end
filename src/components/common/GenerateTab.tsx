import React from "react";
import styled from "styled-components";
import theme from "styles/theme";

interface GenerateTabProps {
  title: string;
  selectedTab: string;
  onSelectTab: (title: string) => void;
}

const GenerateTab: React.FC<GenerateTabProps> = ({
  title,
  selectedTab,
  onSelectTab,
}: GenerateTabProps) => {
  return (
    <TabButton
      key={title}
      onClick={() => onSelectTab(title)}
      $isSelected={title === selectedTab}
    >
      {title}
    </TabButton>
  );
};

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
  font-family: ${({ $isSelected }) =>
    $isSelected ? "NotoSansBold" : "NotoSansRegular"};
  padding: 20px 26px;
  text-align: left;
`;

export default GenerateTab;
