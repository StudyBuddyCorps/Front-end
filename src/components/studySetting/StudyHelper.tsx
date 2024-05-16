import React, { useState } from "react";
import styled from "styled-components";
import Radio from "./Radio";

interface StudyHelperProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const StudyHelper: React.FC<StudyHelperProps> = ({ setSelectedTab }) => {
  const [inputStatus, setInputStatus] = useState<string>('ChatGPT');
  
  const handleClickButton = (buttonName: string) => {
    setInputStatus(buttonName);
    console.log('Selected ID:', buttonName);
  };

  const handlePrevButtonClick = () => {
    setSelectedTab('2. 스터디 메이트');
  };
  
  const handleNextButtonClick = () => {
    setSelectedTab('4. 디폴트 설정');
  };

  return (
    <Wrapper>
      <div>
        <Title>스터디 도우미</Title>
        <Text>공부하다가 모르는게 있으면 바로 스터디 도우미에게 물어보세요!</Text>        
      </div>
      <GPTType>
        <div>
          <Radio
            handleClickAdmin={handleClickButton}
            selected={inputStatus === 'ChatGPT'}
            text="ChatGPT"
            id="ChatGPT"
            fontSize="24px"
            fontFamily="NotoSansSemiBold"
          />
          <Example>안녕하세요! 무엇을 도와드릴까요? 😊</Example>          
        </div>
        <div>
          <Radio
            handleClickAdmin={handleClickButton}
            selected={inputStatus === '천재 너드 친구'}
            text="천재 너드 친구"
            id="천재 너드 친구"
            fontSize="24px"
            fontFamily="NotoSansSemiBold"
          />    
          <Example>오. 오랜만이야. 어떤. 흥미로운 질문을. 준비했지?</Example>        
        </div>
        <div>
          <Radio
            handleClickAdmin={handleClickButton}
            selected={inputStatus === '조선시대 성균관생'}
            text="조선시대 성균관생"
            id="조선시대 성균관생"
            fontSize="24px"
            fontFamily="NotoSansSemiBold"
          />   
          <Example>소인에게 무엇을 명하려는지, 자세히 알려주시오.</Example>       
        </div>
        <div>
          <Radio
            handleClickAdmin={handleClickButton}
            selected={inputStatus === '요정'}
            text="요정"
            id="요정"
            fontSize="24px"
            fontFamily="NotoSansSemiBold"
          />          
          <Example>뾰로롱 요정 등장~（￣︶￣）↗ 🧚✨</Example>
        </div>
      </GPTType>
      <Buttons>
        <Button onClick={handlePrevButtonClick}>이전</Button>
        <Button onClick={handleNextButtonClick}>다음</Button>
      </Buttons>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 55vw;
  height: 88vh;
  background-color: #FFFFFF;
  border: none;
  border-radius: 0 15px 15px 0;
  padding: 50px 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: scroll;
  scrollbar-width: none; /* Firefox 용 스크롤 바 숨김 */
  -ms-overflow-style: ne; /* IE 및 Edge 용 스크롤 바 숨김 */
  &::-webkit-scrollbar {
    display: none; /* Chrome 및 Safari 용 스크롤 바 숨김 */
  }
`;

const Title = styled.div`
  font-family: InterExtraBold;
  font-size: 36px;
  margin-bottom: 20px;
`;

const Text = styled.div`
  font-family: InterExtraBold;
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.subMain};
`;

const GPTType = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Example = styled.div`
  height: 46px;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => (theme.colors.white01 )};
  font-size: 20px;
  padding-left: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  width: 150px;
  height: 54px;
  color: #FFFFFF;
  background-color: #586FC5;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

export default StudyHelper;