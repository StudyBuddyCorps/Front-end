import styled from "styled-components";
import Header from "shared/Header";
import MainLayout from "components/common/Layout/MainLayout";
import Time from "components/common/Time";
import MyHistoryCalendar from "components/calendar/MyHistoryCalendar";
import MyHistoryTime from "components/calendar/MyHistroyTime";
import Footer from "components/common/Layout/Footer";

const MemberCalendar = () => {
  return (
    <MainLayout>
      <Header title="배주헝"></Header>
      <MainContent>
        <div className="left">
          <MyHistoryCalendar></MyHistoryCalendar>
        </div>
        <div className="right">
          <MyHistoryTime
            dayTime="00 : 02 : 02"
            weekTime="00 : 02 : 02"
            monthTime="15 : 01 : 02"
          ></MyHistoryTime>
        </div>
      </MainContent>
      <Footer>
        <Time
          title="목표 달성률"
          totalTime="03 : 40 : 01"
          goalTime="06 : 00 : 00"
        ></Time>
      </Footer>
    </MainLayout>
  );
};

const MainContent = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 40px;
  margin-bottom: 10px;

  .right {
    flex: 1;
  }

  .left {
    flex: 1.5;
    display: flex;
  }
`;

export default MemberCalendar;
