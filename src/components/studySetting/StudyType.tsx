import React, { useState } from "react";
import styled from "styled-components";
import Radio from "./Radio";
import Done from "../../assets/Done.png"

interface StudyTypeProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const StudyType: React.FC<StudyTypeProps> = ({ setSelectedTab }) => {
  const [inputStatus, setInputStatus] = useState<string>('기본');

  const handleClickButton = (buttonName: string) => {
    setInputStatus(buttonName);
    console.log('Selected ID:', buttonName);
  };

  const handleNextButtonClick = () => {
    setSelectedTab('2. 스터디 메이트');
  };

  return (
    <Wrapper>
      <Container>
        <Radio
          handleClickAdmin={handleClickButton}
          selected={inputStatus === '기본'}
          text="기본"
          id="기본"
          fontSize="24px"
          fontFamily="NotoSansSemiBold"
        />
        <Describe>
          <img src={Done} alt="done" />
          <span>시간 제한 없이 풀타임</span>
        </Describe>
        <Describe>
          <img src={Done} alt="done" />
          <span>휴식 시간 없이 빡공</span>
        </Describe>
        <Describe>
          <img src={Done} alt="done" />
          <span>나의 평균 공부 시간은?</span>
        </Describe>
      </Container>
      <Container>
        <Radio
          handleClickAdmin={handleClickButton}
          selected={inputStatus === '뽀모도로'}
          text="뽀모도로"
          id="뽀모도로"
          fontSize="24px"
          fontFamily="NotoSansSemiBold"
        />
        <Describe>
          <img src={Done} alt="done" />
          <span>25분 공부 + 5분 휴식 공부법!</span>
        </Describe>
        <Describe>
          <img src={Done} alt="done" />
          <span>체계적으로 공부하고 싶을 때 추천</span>
        </Describe>
        <Describe>
          <img src={Done} alt="done" />
          <span>휴식 시간이 주어지면서 공부하고 싶다면!</span>
        </Describe>
      </Container>

      {/* 버튼 클릭 시 스터디 메이트 탭으로 이동하는 버튼 */}
      <BtnDiv>
        <Button onClick={handleNextButtonClick}>다음</Button>
      </BtnDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 55vw;
  height: 88vh;
  background-color: #FFFFFF;
  border: none;
  border-radius: 0 15px 15px 0;
  padding: 84px 100px;
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

const Container = styled.div`
  height: 33vh;
`;

const Describe = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 500;
  margin-left: 10px;
  gap: 5px;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
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
  cursor: pointer;
`;

export default StudyType;