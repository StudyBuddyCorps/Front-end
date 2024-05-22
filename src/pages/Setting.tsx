import Header from "shared/Header";
import Layout from "shared/Layout";
import Tab from "components/setting/Tab";
import { useState } from "react";
import EnvSetting from "components/setting/EnvSetting";
import GoalSetting from "components/setting/GoalSetting";
import Account from "components/setting/Account";

const Setting = () => {
  const [selectedTab, setSelectedTab] = useState('계정 정보');

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };  

  return (
    <Layout>
      <Header 
        title="Settings"
      />
      <Tab
        tabs={['계정 정보', '환경 설정', '목표 설정']}
        selectedTab={selectedTab}
        onSelectTab={handleTabSelect}
      />

      {selectedTab === '계정 정보' ? <Account />
      : selectedTab === '환경 설정' ? <EnvSetting />
      : <GoalSetting />}
    </Layout>
  );
};

export default Setting;