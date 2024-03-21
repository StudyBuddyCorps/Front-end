import React, { useState } from 'react';
import styled from 'styled-components';
import Login from 'components/account/Login';
import Join from 'components/account/Join';
import Tab from 'components/account/Tab';

const Account: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('로그인');

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <Wrapper>
      <Tab
        tabs={['로그인', '회원가입']}
        selectedTab={selectedTab}
        onSelectTab={handleTabSelect}
      />
      {selectedTab === '로그인' ? <Login /> : <Join />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

export default Account;