import styled from "styled-components";
import SelectBox from "../common/SelectBox";
import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../utils/localStroage";

const hours: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const minutes: number[] = [0, 10, 20, 30, 40, 50];

const GoalSetting: React.FC = () => {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 6 }, (_, i) => i * 10);

  useEffect(() => {
    const fetchGoal = async () => {
      const token = getToken();
      try {
        const response = await axios.get("http://localhost:8080/users/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const goal = response.data.goal;
        const initialHours = Math.floor(goal / 3660);
        const initialMinutes = Math.floor((goal % 3600) / 60);

        setTotalTime(goal);
        setSelectedHour(initialHours);
        setSelectedMinute(initialMinutes);
      } catch (error) {
        console.error("목표 공부 시간 가져오기 실패:", error);
      }
    };

    fetchGoal();
  }, []);

  const handleSave = async () => {
    const token = getToken();

    const total = (selectedHour * 60 + selectedMinute) * 60; // 시간을 초로 변환 후 합산
    setTotalTime(total);
    console.log("총 공부시간:", total);

    try {
      await axios.put(
        "http://localhost:8080/users/goal",
        { goal: total },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("목표 공부 시간이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("목표 공부 시간 업데이트 실패:", error);
      alert("목표 공부 시간 업데이트에 실패했습니다.");
    }
  };

  const handleHourChange = (value: number) => {
    setSelectedHour(value);
  };

  const handleMinuteChange = (value: number) => {
    setSelectedMinute(value);
  };
  return (
    <Wrapper>
      <LContainer>
        <Title>하루 총 공부시간</Title>
        <Bottom>
          <Container>
            <SelectBox
              optionData={hours}
              onChange={handleHourChange}
              defaultValue={selectedHour}
            />
            <span>시간</span>
          </Container>
          <Container>
            <SelectBox
              optionData={minutes}
              defaultValue={selectedMinute}
              onChange={handleMinuteChange}
            />
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
  border: 2px solid ${({ theme }) => theme.colors.white01};
  border-radius: 5px;
  margin: 43px;
  padding: 45px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const LContainer = styled.div``;

const RContainer = styled.div``;

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
  color: #ffffff;
  background-color: ${({ theme }) => theme.colors.subMain};
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export default GoalSetting;
