import React, { useState } from "react";
import styled from "styled-components";
import Radio from "components/studySetting/Radio";

interface EnvRoomTypeProps {
  onSelect: (type: string) => void;
}

const EnvRoomType: React.FC<EnvRoomTypeProps> = ({ onSelect }) => {
  const [inputStatus, setInputStatus] = useState<string>("normal");
  const [customPhrase, setCustomPhrase] = useState<string>('');

  const handleClickButton = (buttonName: string) => {
    setInputStatus(buttonName);
    onSelect(buttonName);
    console.log('Selected ID:', buttonName);
  };

  return (
    <Wrapper>
      <Title>공부방 유형 <span>*</span></Title>
      <RadioDiv>
        <Radio
           handleClickAdmin={() => handleClickButton("normal")}
          selected={inputStatus === "normal"}
          text="기본"
          id="normal"
        />
        <Radio
          handleClickAdmin={() => handleClickButton("pomodoro")}
          selected={inputStatus === 'pomodoro'}
          text="뽀모도로 (25분 공부 + 5분 휴식)"
          id="pomodoro"
        />         
      </RadioDiv>
    </Wrapper>
  );
};


const Wrapper = styled.div``;

const RadioDiv = styled.div`
`;

const Title = styled.div`
  font-size: 20px;
  font-family: 'NotoSansSemiBold';
  margin-bottom: 10px;
  
  span {
    color: #FF0000;
    font-size: 24px;
  }
`;


export default EnvRoomType;