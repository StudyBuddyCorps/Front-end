import GenerateLayout from "components/common/Layout/GenerateLayout";
import GenerateTabs from "components/common/GenerateTabs";
import { Button } from "components/common/Button";
import GroupSetting from "components/groupGenerate/GroupSetting";
import GroupMember from "components/groupGenerate/GroupMember";

const GroupGenerate = () => {
  return (
    <GenerateLayout>
      <GenerateTabs>
        <div title="1. 그룹 설정">
          <GroupSetting></GroupSetting>
          <Button width="155px">다음</Button>
        </div>
        <div title="2. 멤버 초대">
          <GroupMember></GroupMember>
          <Button width="155px">다음</Button>
        </div>
      </GenerateTabs>
    </GenerateLayout>
  );
};

export default GroupGenerate;
