import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "shared/Header";
import MainLayout from "components/common/Layout/MainLayout";
import Time from "components/common/Time";
import MyHistoryCalendar from "components/calendar/MyHistoryCalendar";
import MyHistoryTime from "components/calendar/MyHistroyTime";
import Footer from "components/common/Layout/Footer";
import { useCalendarState } from "state/CalendarContext";
import CalendarSidebar from "components/calendar/CalendarSidebar";
import { handleUser } from "services/userServices";

const Calendar = () => {
  const [phrase, setPhrase] = useState<string>("");
  const [goal, setGoal] = useState<number>(0);
  const calendar = useCalendarState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 기본 유저 정보 가져오기
        const response = await handleUser();
        if (response.ok) {
          setPhrase(response.user.phrase.content);
          setGoal(response.user.goal);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // 초기 유저 setting

  return (
    <MainLayout>
      <Header title="Calendar" dis={phrase}></Header>
      <Content />
      <Footer>
        <Time
          title="목표 달성률"
          totalTime={calendar.dailyTime}
          goalTime={goal}
        ></Time>
      </Footer>
      {calendar.isSidebarVisible === false ? null : <CalendarSidebar />}
    </MainLayout>
  );
};

const Content = () => {
  const calendarState = useCalendarState();

  return (
    <ContentContainer isSidebarVisible={calendarState.isSidebarVisible}>
      <Left>
        <MyHistoryCalendar />
      </Left>
      {!calendarState.isSidebarVisible && (
        <Right>
          <MyHistoryTime
            dayTime={calendarState.dailyTime}
            weekTime={calendarState.weeklyTime}
            monthTime={calendarState.monthlyTime}
          />
        </Right>
      )}
    </ContentContainer>
  );
};

const ContentContainer = styled.div<{ isSidebarVisible: boolean }>`
  display: flex;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
  transition: all 0.3s ease;

  /* 사이드바가 열렸을 때 레이아웃 변경 */
  ${({ isSidebarVisible }) =>
    isSidebarVisible
      ? `
    .left {
      width: 100%; /* 사이드바가 열리면 왼쪽 영역을 확장 */
    }
    .right {
      display: none; /* 사이드바가 열리면 오른쪽 영역은 숨김 */
    }
    `
      : `
      .left {
        width: 60%; /* 기본 넓이 */
      }
      .right {
        width: 35%; /* 기본 넓이 */
      }
    `}
`;

const Left = styled.div`
  width: 60%; /* 기본 넓이 */
  transition: width 0.3s ease;
`;

const Right = styled.div`
  width: 35%; /* 기본 넓이 */
  transition: width 0.3s ease;
`;

export default Calendar;
