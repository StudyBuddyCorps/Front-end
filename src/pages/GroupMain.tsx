import styled from "styled-components";
import Header from "shared/Header";
import MainLayout from "components/common/Layout/MainLayout";
import Time from "components/common/Time";
import MyHistoryCalendar from "components/calendar/MyHistoryCalendar";
import MyHistoryTime from "components/calendar/MyHistroyTime";
import Footer from "components/common/Layout/Footer";
import Button from "components/common/Button";
import MemberField from "components/group/MemberField";

const GroupMain = () => {
  return (
    <MainLayout>
      <Header title="불쌍한 4학년 모임" dis="사학년이 아니라 사(死)학년">
        <Button width="150px" onClick={() => {}}>
          그룹 설정
        </Button>
        <Button width="150px" onClick={() => {}}>
          멤버 추가
        </Button>
      </Header>
      <MainContent>
        <div className="left">
          <MyHistoryCalendar></MyHistoryCalendar>
        </div>
        <div className="right">
          <MemberField></MemberField>
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

export default GroupMain;
