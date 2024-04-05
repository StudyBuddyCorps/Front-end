import React, { useState } from "react";
import styled from "styled-components";
import { Character } from "./Character";

interface OptionItemProps {
  item: Character;
  onClick: (item: Character) => void;
  selected: boolean;
}

const OptionItem: React.FC<OptionItemProps> = ({ item, onClick, selected }) => {
  
  const handleItemClick = () => {
    if (!selected) {
      onClick(item);
    }
  };

  return (
    <Wrapper selected={selected} onClick={handleItemClick}>
      <ItemImge 
        src={item.small_img} 
        alt={item.name}  
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ selected: boolean }>`
  width: 64px;
  height: 64px;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: #ECECEC;
  border: 2px solid transparent;
  border-radius: 12px;

  ${({ selected }) => selected && `
    border-color: #586FC5;
  `}
`;

const ItemImge = styled.img`
  width: 96%;
  height: 96%;
  object-fit: fill;
  cursor: pointer;
`;

export default OptionItem;