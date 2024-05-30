import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GenerateLayout from "components/common/Layout/GenerateLayout";
import GenerateTabs from "components/common/GenerateTabs";
import Button from "components/common/Button";
import GroupSetting from "components/groupGenerate/GroupSetting";
import GroupMember from "components/groupGenerate/GroupMember";

const GroupGenerate = () => {
  const [selectedTab, setSelectedTab] = useState("1. 그룹 설정");
  const navigate = useNavigate();

  const handleSelectTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleCompleteGenerate = () => {
    navigate("/group");
  };

  return (
    <GenerateLayout>
      <GenerateTabs
        selectedTab={selectedTab}
        handleSelectTab={() => handleSelectTab(selectedTab)}
      >
        <div title="1. 그룹 설정">
          <GroupSetting></GroupSetting>
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
          <GroupMember></GroupMember>
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
