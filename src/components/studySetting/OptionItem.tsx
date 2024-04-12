import React from "react";
import styled from "styled-components";
import { Character } from "./Character";
import { Voice } from "./Voice";

interface OptionItemProps {
  item: Character | Voice;
  onClick: (item: Character | Voice) => void;
  selected: boolean;
}

const OptionItem: React.FC<OptionItemProps> = ({ item, onClick, selected }) => {
  return (
    <Wrapper selected={selected} onClick={() => onClick(item)}>
      <ItemImge 
        src={item.img} 
        alt={item.name}  
        itemType={isCharacter(item) ? 'character' : 'voice'} // Character인지 검사
      />
    </Wrapper>
  );
};

{/* item인 Character인지 Voice인지 확인 */}
const isCharacter = (item: Character | Voice): item is Character => {
  return (item as Character).large_img !== undefined;
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

const ItemImge = styled.img<{ itemType: 'character' | 'voice' }>`
  width: ${({ itemType }) => itemType === 'character' ? '94%' : '70%'};
  height: ${({ itemType }) => itemType === 'character' ? '94%' : '70%'};
  object-fit: fill;
  cursor: pointer;
`;

export default OptionItem;