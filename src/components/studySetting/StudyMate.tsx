import React, { useState } from "react";
import styled from "styled-components";
import CharacterList from "./CharacterList";
import VoiceList from "./VoiceList";

interface StudyMateProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  setStudyMateVoice: React.Dispatch<React.SetStateAction<string>>;
}

const StudyMate: React.FC<StudyMateProps> = ({ setSelectedTab, setStudyMateVoice }) => {
  const handlePrevButtonClick = () => {
    setSelectedTab('1. 스터디룸 타입');
  };
  
  const handleNextButtonClick = () => {
    setSelectedTab('3. 스터디 도우미');
  };

  return (
    <Wrapper>
      <Container>
        <CharacterList />
        <VoiceList setStudyMateVoice={setStudyMateVoice}/>

        <Buttons>
          <Button onClick={handlePrevButtonClick}>이전</Button>
          <Button onClick={handleNextButtonClick}>다음</Button>
        </Buttons>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 55vw;
  height: 88vh;
  background-color: #FFFFFF;
  border: none;
  border-radius: 0 15px 15px 0;
  padding: 84px 7%;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 60px;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox 용 스크롤 바 숨김 */
  -ms-overflow-style: none; /* IE 및 Edge 용 스크롤 바 숨김 */
  &::-webkit-scrollbar {
    display: none; /* Chrome 및 Safari 용 스크롤 바 숨김 */
  }
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
`;

export default StudyMate;