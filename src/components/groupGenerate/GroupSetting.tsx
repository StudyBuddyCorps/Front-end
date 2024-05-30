import React, { useState } from "react";
import styled from "styled-components";
import { TextField } from "components/common/FieldStyle";
import FieldArea from "components/common/FieldArea";
import SelectBox from "components/common/SelectBox";

const hours: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const minutes: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const GroupSetting: React.FC = () => {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);

  const handleSave = () => {
    const total = selectedHour * 60 + selectedMinute; // 시간을 분으로 변환 후 합산
    setTotalTime(total);
    console.log("총 공부시간:", total);
  };

  const handleHourChange = (value: number) => {
    setSelectedHour(value);
  };

  const handleMinuteChange = (value: number) => {
    setSelectedMinute(value);
  };

  return (
    <Wrapper>
      <FieldArea title="그룹 이름" desc="한글, 영문, 숫자 조합 2~18자">
        <TextField
          width="auto"
          height="46px"
          placeholder="ex. 불쌍한 사학년"
        ></TextField>
      </FieldArea>
      <FieldArea title="그룹 소개" desc="그룹을 잘 나타낼 수 있는 한 마디">
        <TextField
          width="auto"
          height="46px"
          placeholder="ex. 사학년이 아닌 사(死)학년"
        ></TextField>
      </FieldArea>
      <FieldArea
        title="그룹 목표"
        desc="멤버들과 함께 하루 공부 목표 시간을 정해보세요! 추후 그룹 설정에서 수정이 가능합니다."
      >
        <Container>
          <SelectBox optionData={hours} onChange={handleHourChange} />
          <span>시간</span>
          <SelectBox optionData={minutes} onChange={handleMinuteChange} />
          <span>분</span>
        </Container>
      </FieldArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 50px;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 18px;
  gap: 10px;
`;
export default GroupSetting;
