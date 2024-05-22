import React, { useState } from "react";
import styled from "styled-components";
import { subMonths, format } from "date-fns";
import useCalendar from "hooks/useCalendar";
import Day from "./Day";
import Prev from "../../assets/images/prev_icon.png";
import Next from "../../assets/images/next_icon.png";

const DAY_LIST = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MyHistoryCalendar = () => {
  const calendar = useCalendar();
  const result = format(calendar.currentDate, "yyyy'년' MM'월'");
  const c = calendar.weekCalendarList;

  const [select, setSelect] = React.useState<number[]>([]);
  return (
    <Container>
      <TitleS>
        <Icon
          src={Prev}
          onClick={() => {
            calendar.setCurrentDate(subMonths(calendar.currentDate, +1));
          }}
        />
        <span> {result} </span>
        <Icon
          src={Next}
          onClick={() => {
            calendar.setCurrentDate(subMonths(calendar.currentDate, -1));
          }}
        />
      </TitleS>
      <ContentS>
        <Week>
          {DAY_LIST.map((item) => (
            <WeekT>{item}</WeekT>
          ))}
        </Week>
        <Dayweek>
          {c.map((item) => (
            <Week>
              {item.map((day) => (
                <Day day={day}>
                  <button></button>
                </Day>
              ))}
            </Week>
          ))}
        </Dayweek>
      </ContentS>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: NotoSansSemiBold;
  font-size: 24px;
`;

const ContentS = styled.div`
  display: flex;
  flex-direction: column;
  font-family: NotoSansRegular;
  color: ${({ theme }) => theme.colors.black02};
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
`;

const Icon = styled.img`
  width: 12px;
  height: 16px;
  padding: 10px;
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, auto); /* 7개의 열을 자동으로 생성 */
  grid-column-gap: 32px;
  > :nth-child(1) {
    /* grid의 첫 번째 열에 대해서만 빨간색 */
    color: red;
  }
`;

const WeekT = styled.div`
  width: 70px;
  margin-bottom: 10px;
`;

const Dayweek = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 70px;
  margin: 10px 0px;
`;

export default MyHistoryCalendar;
