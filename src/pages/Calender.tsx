import styled from "styled-components";
import Header from "shared/Header";
import MainLayout from "components/common/Layout/MainLayout";
import Time from "components/common/Time";
import MyHistoryCalendar from "components/calendar/MyHistoryCalendar";
import MyHistoryTime from "components/calendar/MyHistroyTime";

const Calendar = () => {
  return (
    <MainLayout>
      <Header title="Calendar" dis="This is Calendar"></Header>

      <CalendarLayout>
        <div className="mainItem">
          <MyHistoryCalendar></MyHistoryCalendar>
        </div>
        <div className="history">
          <MyHistoryTime
            dayTime="00 : 02 : 02"
            weekTime="00 : 02 : 02"
            monthTime="15 : 01 : 02"
          ></MyHistoryTime>
        </div>
        <div className="footer"></div>
      </CalendarLayout>
    </MainLayout>
  );
};

const CalendarLayout = styled.div`
  display: grid;
  padding: 10px 50px;
  grid-template-areas:
    "item1 item2"
    "item3 item3";
  grid-template-columns; 2fr 1fr;
  gap: 30px;
  background-color: main;
  align-items: center;

  .mainItem {
    grid-area: item1;
  }

  .history {
    grid-area: item2;
  }

  footer {
    grid-area: item3;
  }
`;

export default Calendar;
