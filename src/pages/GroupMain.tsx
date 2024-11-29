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
import MemberField, { Member } from "components/group/MemberField";
import InviteMember from "components/group/InviteMember";
import axios from "axios";
import { getToken } from "utils/localStroage";

interface Group {
  groupId: string;
  name: string;
  description: string;
  goalStudyTime: number;
  members: Member[];
}

const GroupMain = () => {
  const { groupName } = useParams<{ groupName: string }>();
  const [studygroup, setStudygroup] = useState<Group | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const token = getToken();

  const fetchGroupData = async () => {
    try {
      const groupResponse = await axios.get(
        "http://localhost:8080/groups/mygroup",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const groups: Group[] = groupResponse.data;

      // Find the group by name
      const group = groups.find((g) => g.name === groupName);
      if (!group) {
        throw new Error("Group not found");
      }

      setGroupId(group.groupId);

      const groupDetailResponse = await axios.get(
        `http://localhost:8080/groups/${group.groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const groupMemberResponse = await axios.get(
        `http://localhost:8080/groups/${group.groupId}/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudygroup({
        groupId: groupDetailResponse.data.groupId,
        name: groupDetailResponse.data.name,
        description: groupDetailResponse.data.description,
        goalStudyTime: groupDetailResponse.data.goalStudyTime,
        members: groupMemberResponse.data,
      });
    } catch (error) {
      console.error("그룹 정보를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, [groupName]);

  if (!studygroup) {
    return <div>Loading...</div>;
  }

  const handleOpenInvite = () => {
    setIsInviteModalOpen(true);
  };

  const handleCloseInvite = () => {
    fetchGroupData();
    setIsInviteModalOpen(false);
  };

  const handleMemberInvite = () => {
    fetchGroupData();
    setIsInviteModalOpen(false);
  };

  return (
    <MainLayout>
      <Header title={studygroup.name} dis={studygroup.description}>
        <Button width="150px" onClick={() => {}}>
          그룹 설정
        </Button>
        <Button width="150px" onClick={handleOpenInvite}>
          멤버 추가
        </Button>
      </Header>
      {isInviteModalOpen && groupId && (
        <InviteMember
          groupId={groupId}
          onClose={handleCloseInvite}
          onMemberInvite={handleMemberInvite}
        />
      )}
      <ContentContainer>
        <Left>
          <MyHistoryCalendar />
        </Left>

        <Right>
          {groupId && (
            <MemberField
              groupId={groupId}
              initialMembers={studygroup.members}
            />
          )}
        </Right>
      </ContentContainer>
      <Footer>
        <Time
          title="목표 달성률"
          totalTime={10}
          goalTime={studygroup.goalStudyTime}
        ></Time>
      </Footer>
    </MainLayout>
  );
};

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
  transition: all 0.3s ease;
`;

const Left = styled.div`
  width: 60%; /* 기본 넓이 */
  transition: width 0.3s ease;
`;

const Right = styled.div`
  width: 35%; /* 기본 넓이 */
  transition: width 0.3s ease;
`;

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
