import React, { useState } from 'react';
import styled from 'styled-components';

interface OptionData {
  key: string;
  value: string;
}

const SelectBox: React.FC<{ optionData: OptionData[] }> = ({ optionData }) => {
  const [currentValue, setCurrentValue] = useState(optionData[0]?.value);
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (value: string) => {
    setCurrentValue(value);
    setShowOptions(false);
  };

  return (
    <SelectContainer onClick={() => setShowOptions((prev) => !prev)}>
      <Label>{currentValue}</Label>
      <SelectOptions show={showOptions}>
        {optionData.map((data) => (
          <Option
            key={data.key}
            onClick={() => handleOnChangeSelectValue(data.value)}
          >
            {data.value}
          </Option>
        ))}
      </SelectOptions>
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  position: relative;
  width: 100px;
  height: 45px;
  border-radius: 5px;
  background-color: ${({ theme }) => (theme.colors.white01)};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 18px;
`;

const SelectOptions = styled.ul<{ show: boolean }>`
  position: absolute;
  list-style: none;
  top: 36px;
  left: 0;
  width: 100%;
  overflow: hidden;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 5px;
  background-color: ${({ theme }) => (theme.colors.black01)};
  color: #fefefe;
  text-align: right;
`;
const Option = styled.li`
  font-size: 14px;
  padding: 4px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: ${({ theme }) => (theme.colors.background)};
  }
`;

export default SelectBox;
