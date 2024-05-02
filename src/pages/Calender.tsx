import styled from "styled-components";
import Header from "shared/Header";
import Layout from "shared/Layout";
import Time from "shared/Time";
import Field from "components/calendar/Field";
import MyHistoryCalendar from "components/calendar/MyHistoryCalendar";
import MyHistoryTime from "components/calendar/MyHistroyTime";

const Calendar = () => {
  return (
    <Layout>
      {/* 페이지 설명 */}
      <Header title="Calendar" dis="This is Calendar"></Header>

      <Study>
        <Field>
          <MyHistoryCalendar></MyHistoryCalendar>
        </Field>
        <Field>
          <MyHistoryTime
            dayTime="00 : 02 : 02"
            weekTime="00 : 02 : 02"
            monthTime="15 : 01 : 02"
          ></MyHistoryTime>
        </Field>
      </Study>

      <Time
        title="목표 달성률"
        totalTime="03 : 40 : 01"
        goalTime="06 : 00 : 00"
      />
    </Layout>
  );
};

const Study = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  gap: 100px;
`;

export default Calendar;
