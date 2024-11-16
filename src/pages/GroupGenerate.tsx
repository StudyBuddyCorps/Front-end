import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GenerateLayout from "components/common/Layout/GenerateLayout";
import GenerateTabs from "components/common/GenerateTabs";
import Button from "components/common/Button";
import GroupSetting from "components/groupGenerate/GroupSetting";
import GroupMember from "components/groupGenerate/GroupMember";
import axios from "axios";
import { getToken } from "utils/localStroage";

const GroupGenerate = () => {
  const [selectedTab, setSelectedTab] = useState("1. 그룹 설정");
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [goalStudyTime, setGoalStudyTime] = useState(0);
  const navigate = useNavigate();

  const handleSelectTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleCompleteGenerate = async () => {
    const token = getToken();

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/groups/create", 
        {
          name: groupName,
          description: description,
          goalStudyTime: goalStudyTime * 60 * 1000, // 분 단위로 계산된 시간
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },  
        }
      );
      navigate("/group");
    } catch (error) {
      console.error("그룹 생성 중 오류 발생:", error);
    }
  };

  return (
    <GenerateLayout>
      <GenerateTabs
        selectedTab={selectedTab}
        handleSelectTab={() => handleSelectTab(selectedTab)}
      >
        <div title="1. 그룹 설정">
          <GroupSetting
            setGroupName={setGroupName}
            setDescription={setDescription}
            setGoalStudyTime={setGoalStudyTime}
          />
          <ButtonSection>
            <Button
              width="155px"
              onClick={() => setSelectedTab("2. 멤버 초대")}
            >
              다음
            </Button>
          </ButtonSection>
        </div>
        <div title="2. 멤버 초대">
          <GroupMember />
          <ButtonSection>
            <Button
              width="155px"
              onClick={() => setSelectedTab("1. 그룹 설정")}
            >
              이전
            </Button>
            <Button width="155px" onClick={handleCompleteGenerate}>
              다음
            </Button>
          </ButtonSection>
        </div>
      </GenerateTabs>
    </GenerateLayout>
  );
};

const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

export default GroupGenerate;
