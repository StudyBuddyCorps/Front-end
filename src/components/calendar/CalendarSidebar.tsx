import { useState, useEffect } from "react";
import ScoreCard from "components/feedback/ScoreCard";
import {
  useCalendarState,
  useCalendarDispatch,
} from "../../state/CalendarContext";
import styled from "styled-components";
import CommentsCard from "components/feedback/CommentsCard";
import DonutChart from "components/feedback/DonutCard";
import { DateRecord } from "DTO/calendar/DateRecord.dto";
import { timeToShortString } from "utils/timeLine";

const initialState: DateRecord = {
  totalTime: 0,
  feedTime: 0,
  sleepCount: 0,
  phoneCount: 0,
  postureCount: 0,
  totalAdvice: "",
};

const CalendarSidebar = () => {
  const calendarState = useCalendarState();
  const dispatch = useCalendarDispatch();
  const [dateRecord, setDate] = useState<DateRecord>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      if (calendarState.selectedDay == 0) {
        console.error("selectedDay is not defined yet");
        return;
      }
      try {
        const record = calendarState.dateRecord.find(
          (record) => record.date === calendarState.selectedDay
        );

        console.log(record);

        if (!record) {
          console.log("record is not existing");
          return;
        }

        setDate((prevData) => {
          return {
            ...prevData,
            totalTime: record?.totalTime,
            feedTime: record?.feedTime,
            sleepCount: record?.sleepCount,
            phoneCount: record?.phoneCount,
            postureCount: record?.postureCount,
            totalAdvice: record?.totalAdvice,
          };
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [calendarState.selectedDay]);

  const handleClose = () => {
    dispatch({
      type: "CLOSE_SIDEBAR",
    });
  };

  return (
    <SidebarContainer isVisible={calendarState.isSidebarVisible}>
      <Header>
        <div>{calendarState.selectedDay}일</div>
        <button onClick={handleClose}>X</button>
      </Header>
      <Content>
        <TotalTime>
          <div>Total Time</div>
          <p>{timeToShortString(dateRecord.totalTime)}</p>
        </TotalTime>
        <ScoreCard
          totalTime={dateRecord.totalTime}
          feedTime={dateRecord.feedTime}
        />
        <DonutChart
          sleep={dateRecord.sleepCount}
          phone={dateRecord.phoneCount}
          posture={dateRecord.postureCount}
        ></DonutChart>
        <CommentsCard advice={dateRecord.totalAdvice}></CommentsCard>
      </Content>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  right: 0; /* 사이드바를 오른쪽에 고정 */
  width: 30%;
  height: 95vh;
  overflow-y: auto; /* 스크롤 활성화 */
  background-color: ${({ theme }) => theme.colors.black02};
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.5); /* 오른쪽 아래로 5px  offset, 흐림 반경 10px, 검정색 그림자 */
  padding: 30px;
  color: white;
  z-index: 1000;
  scroll-padding: 100px;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge에서 스크롤바 숨기기 */
  }
  transition: transform 0.5s ease;

  ${({ isVisible }) =>
    isVisible
      ? `
    transform: translateX(0);
  `
      : `
    transform: translateX(100%); /* 사이드바가 닫힐 때 오른쪽으로 밀림 */
  `}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  div {
    font-size: 24px;
    justify-content: center;
    font-family: InterMedium;
  }

  button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TotalTime = styled.div`
  div {
    margin: 0;
    font-size: 30px;
    font-family: InterMedium;
  }

  p {
    margin: 0;
    font-size: 40px;
    font-weight: InterMedium;
    color: ${({ theme }) => theme.colors.main};
  }
`;

export default CalendarSidebar;
