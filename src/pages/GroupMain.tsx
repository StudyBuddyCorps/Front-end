import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "shared/Header";
import MainLayout from "components/common/Layout/MainLayout";
import Time from "components/common/Time";
import MyHistoryCalendar from "components/calendar/MyHistoryCalendar";
import MyHistoryTime from "components/calendar/MyHistroyTime";
import Footer from "components/common/Layout/Footer";
import Button from "components/common/Button";
import MemberField from "components/group/MemberField";
import Ava from "assets/images/avatar_woman.png";
import axios from "axios";

interface Member {
  name: string;
  imgUrl: string;
  role: string;
}

interface Group {
  name: string;
  description: string;
  goalStudyTime: number;
  members: Member[];
}

const formatGoalTime = (milliseconds: number) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000).toString().padStart(2, '0');
  return `${hours} : ${minutes} : ${seconds}`;
};

const GroupMain = () => {
  const { groupName } = useParams<{ groupName: string }>();
  const [studygroup, setStudygroup] = useState<Group | null>(null);
  console.log("groupName: ", groupName);
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const encodedGroupName = encodeURIComponent(groupName as string);
        const groupInfoResponse = await axios.get(`http://localhost:8080/groups/name/${encodedGroupName}`);
        
        const groupId = groupInfoResponse.data.groupId;
        console.log("GroupId: ", groupId);

        const groupDataResponse = await axios.get(`http://localhost:8080/groups/${groupId}`);

        const groupData = groupDataResponse.data;
        const membersWithNames = await Promise.all(
          groupData.members.map(async (member: any) => {
            const userResponse = await axios.get(`http://localhost:8080/users/${member.userId}`);
            return {
              name: userResponse.data.name,
              imgUrl: userResponse.data.imgUrl || Ava, // 기본 이미지 처리
              role: member.role,
            };
          })
        );

        setStudygroup({
          ...groupData,
          members: membersWithNames,
        });
      } catch (error) {
        console.error("그룹 정보를 불러오는 중 오류 발생:", error);
      }
    };

    if (groupName) {
      fetchGroupData();
    }
  }, [groupName]);

  if (!studygroup) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <Header title={studygroup.name} dis={studygroup.description}>
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
          <MemberField members={studygroup.members}></MemberField>
        </div>
      </MainContent>
      <Footer>
        <Time
          title="목표 달성률"
          totalTime="03 : 40 : 01"
          goalTime={formatGoalTime(studygroup.goalStudyTime)}
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
