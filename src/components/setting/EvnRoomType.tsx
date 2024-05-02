import React, { useState } from "react";
import styled from "styled-components";
import Radio from "components/studySetting/Radio";

const EnvRoomType = () => {
  const [inputStatus, setInputStatus] = useState<string>('기본');
  const [customPhrase, setCustomPhrase] = useState<string>('');
  const handleClickButton = (buttonName: string) => {
    setInputStatus(buttonName);
    console.log('Selected ID:', buttonName);
  };

  return (
    <Wrapper>
      <Title>공부방 유형 <span>*</span></Title>
      <RadioDiv>
        <Radio
          handleClickAdmin={handleClickButton}
          selected={inputStatus === '기본'}
          text="기본"
          id="기본"
        />
        <Radio
          handleClickAdmin={handleClickButton}
          selected={inputStatus === '뽀모도로'}
          text="뽀모도로 (25분 공부 + 5분 휴식)"
          id="뽀모도로"
        />         
      </RadioDiv>
    </Wrapper>
  );
};


const Wrapper = styled.div``;

const RadioDiv = styled.div`
 margin-left: 20px;
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