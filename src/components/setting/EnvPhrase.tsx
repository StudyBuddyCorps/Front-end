import React, { useState } from "react";
import styled from "styled-components";
import Radio from "../studySetting/Radio";
import axios from "axios";
import { getToken } from "../../utils/localStroage";

const EnvPhrase = () => {
  const [inputStatus, setInputStatus] = useState<string>('랜덤');
  const [customPhrase, setCustomPhrase] = useState<string>('');
  
  const handleClickButton = (buttonName: string) => {
    setInputStatus(buttonName);
    console.log('Selected ID:', buttonName);
  };

  const handleSave = async() => {
    const token = getToken();

    try {
      const isRandom = inputStatus === '랜덤' ? true : false;
      const phrase = isRandom ? "지금 안 하면 언제 할거야?" : customPhrase;

      await axios.put(
        "http://localhost:8080/users/phrase", 
        { phrase, isRandom },
        { 
          headers: { 
            Authorization: `Bearer ${token}` 
          },
        }
      );

      alert("명언이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("명언 업데이트 실패:", error);
      alert("명언 업데이트에 실패했습니다.");
    }
  };

  return (
    <Wrapper>
      <LContainer>
        <Title>
          공부 명언 랜덤 설정
          <span>당신의 동기부여를 위한 공부 명언을 알려드립니다.</span>
        </Title>
        <Radio
          handleClickAdmin={handleClickButton}
          selected={inputStatus === '랜덤'}
          text="네, 랜덤으로 보여주세요."
          id="랜덤"
        />
        <Custom>
          <Radio
            handleClickAdmin={handleClickButton}
            selected={inputStatus === '직접'}
            text="아니오, 직접 설정할게요."
            id="직접"
          />
          {inputStatus === '직접' && ( // 직접 설정하기 버튼이 눌렸을 때만 입력란을 표시
            <Input
              type="text"
              placeholder="당신의 공부 명언을 적어주세요."
              value={customPhrase}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomPhrase(e.target.value)}
            />
          )}          
        </Custom>
      </LContainer>
      <RContainer>
      <SaveBtn onClick={handleSave}>저장</SaveBtn>
      </RContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid ${({ theme }) => (theme.colors.white01)};
  border-radius: 5px;
  padding: 65px 45px;
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
`;

const LContainer = styled.div``;

const RContainer = styled.div``;

const Title = styled.div`
  font-size: 32px;
  font-family: NotoSansSemiBold;
  margin-bottom: 40px;
  span {
    font-size: 15px;
    color: ${({ theme }) => (theme.colors.subMain )};
    margin-left: 20px;
  }
`;

const Custom = styled.div`
  display: flex;
  gap: 30px;
`;

const Input = styled.input`
  width: 500px;
  border-radius: 5px;
  background-color: ${({ theme }) => (theme.colors.white01 )};
  border: none;
  height: 46px;
  padding-left: 20px;
`;

const SaveBtn = styled.button`
  width: 150px;
  height: 54px;
  color: #FFFFFF;
  background-color: ${({ theme }) => (theme.colors.subMain )};
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export default EnvPhrase;