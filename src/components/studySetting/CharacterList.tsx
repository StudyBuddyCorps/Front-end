import React, { useState } from "react";
import styled from "styled-components";
import Preview from "./Preivew";
import UploadImg from "./UploadImg";
import OptionItem from "./OptionItem";
import { Character } from "./Character";
import { Voice } from "./Voice";
import ImgBox from "../../assets/Img_box.png";

{/* 임시 character 임시 더미 데이터 */}
const characterData: Character[] = [
  { id: 1, name: 'noti', img: require('../../assets/Noti.png'), large_img: require('../../assets/Noti2.png') },
  { id: 2, name: 'woman', img: require('../../assets/avatar_woman.png'), large_img: require('../../assets/avatar_woman.png') },
];

const CharacterList: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(characterData[0]);

  const handleCharacterClick = (item: Character | Voice) => {
    if ('large_img' in item) {
      const character = item as Character;
      setSelectedCharacter(prevCharacter => (prevCharacter && prevCharacter.id === character.id) ? null : character);
      console.log('Selected Character ID:', character.id);
    }
  };

  const handleSelectImgBoxClick = () => {
    setSelectedCharacter(null);
  };

  return (
    <Wrapper>
      {selectedCharacter ? <Preview item={selectedCharacter} /> : <UploadImg />}

      <div>
        <Title>캐릭터 선택 <span>*</span></Title>

        <List>
          {characterData.map(character => (
            <OptionItem
              key={character.id}
              item={character}
              onClick={handleCharacterClick}
              selected={selectedCharacter !== null && selectedCharacter.id === character.id}
            />
          ))}

          <SelectImgBox
            selected={selectedCharacter === null}
            onClick={handleSelectImgBoxClick}
          >
            <img src={ImgBox} alt="select your image" />
          </SelectImgBox>
        </List>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  
  span {
    color: #FF0000;
    font-size: 24px;
  }
`;

const List = styled.div`
  justify-content: space-between;
  justify-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: 22px;
  padding: 0;
`;

const SelectImgBox = styled.div<{ selected: boolean }>`
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ECECEC;
  border: 2px solid transparent;
  border-radius: 12px;

  ${({ selected }) => selected && `
    border-color: #586FC5;
  `}
`;

export default CharacterList;