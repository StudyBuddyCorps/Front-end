import styled from "styled-components";
import SelectBox from "./SelectBox";
import { OptionData } from "./OptionData";
import { useState } from "react";

const hours: OptionData[] = [
  { key: '1', value: '1' },
  { key: '2', value: '2' },
  { key: '3', value: '3' },
  { key: '4', value: '4' },
  { key: '5', value: '5' },
  { key: '6', value: '6' },
  { key: '7', value: '7' },
  { key: '8', value: '8' },
  { key: '9', value: '9' },
  { key: '10', value: '10' },
  { key: '11', value: '11' },
  { key: '12', value: '12' },
];

const minutes: OptionData[] = [
  { key: '5', value: '5' },
  { key: '10', value: '10' },
  { key: '15', value: '15' },
  { key: '20', value: '20' },
  { key: '25', value: '25' },
  { key: '30', value: '30' },
  { key: '35', value: '35' },
  { key: '40', value: '40' },
  { key: '45', value: '45' },
  { key: '50', value: '50' },
  { key: '55', value: '55' },
];

const GoalSetting: React.FC = () => {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [selectedHour, setSelectedHour] = useState<string>('0');
  const [selectedMinute, setSelectedMinute] = useState<string>('0');

  const handleSave = () => {
    const total = parseInt(selectedHour) * 60 + parseInt(selectedMinute); // 시간을 분으로 변환 후 합산
    setTotalTime(total);
    console.log("총 공부시간:", total);
  };

  const handleHourChange = (value: string) => {
    setSelectedHour(value);
  };

  const handleMinuteChange = (value: string) => {
    setSelectedMinute(value);
  };
  return (
    <Wrapper>
      <LContainer>
        <Title>하루 총 공부시간</Title>
        <Bottom>
          <Container>
            <SelectBox optionData={hours} onChange={handleHourChange} />
            <span>시간</span>        
          </Container>
          <Container>
            <SelectBox optionData={minutes} onChange={handleMinuteChange} />
            <span>분</span>        
          </Container>        
        </Bottom>        
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
  margin: 43px;
  padding: 45px;
  box-sizing: border-box;  
  display: flex;
  justify-content: space-between;
`;

const LContainer = styled.div`
`;

const RContainer = styled.div`
`;

const Title = styled.div`
  font-size: 20px;
  font-family: NotoSansSemiBold;
  margin-bottom: 25px;
`;

const Bottom = styled.div`
  display: flex;
  gap: 30px;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 18px;
  gap: 10px;
`;

const SaveBtn = styled.button`
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

export default GoalSetting;