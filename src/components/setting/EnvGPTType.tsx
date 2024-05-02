import React, { useState } from "react";
import styled from "styled-components";
import Radio from "components/studySetting/Radio";

const EnvGPTType = () => {
  const [inputStatus, setInputStatus] = useState<string>('GPT');

  const handleClickButton = (buttonName: string) => {
    setInputStatus(buttonName);
    console.log('Selected ID:', buttonName);
  };

  return (
    <Wrapper>
      <Title>스터디 도우미 선택 <span>*</span></Title>
      <Radio
        handleClickAdmin={handleClickButton}
        selected={inputStatus === 'GPT' }
        text="ChatGPT"
        id="GPT"
      />
      {inputStatus === 'GPT' &&  (
        <Example>안녕하세요! 무엇을 도와드릴까요? 😊</Example>
      )}
      <Radio
        handleClickAdmin={handleClickButton}
        selected={ inputStatus === '너드' }
        text="천재 너드 친구"
        id="너드"
      />
      {inputStatus === '너드' &&  (
        <Example>오. 오랜만이야. 어떤. 흥미로운 질문을. 준비했지?</Example>
      )}
      <Radio
        handleClickAdmin={handleClickButton}
        selected={ inputStatus === '유생' }
        text="조선시대 성균관생"
        id="유생"
      />
      {inputStatus === '유생' &&  (
        <Example>소인에게 무엇을 명하시려는지, 자세히 알려주시옵소서</Example>
      )}
      <Radio
        handleClickAdmin={handleClickButton}
        selected={ inputStatus === '요정' }
        text="뾰로롱 요정"
        id="요정"
      />
      {inputStatus === '요정' &&  (
        <Example>뾰로롱 요정 등장~（￣︶￣）↗ 🧚✨</Example>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`

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

const Example = styled.div`
  width: 600px;
  height: 46px;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => (theme.colors.white01 )};
  font-size: 20px;
  padding-left: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

export default EnvGPTType;