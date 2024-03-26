import React, { useState } from 'react';
import styled from 'styled-components';
import Login from 'components/account/Login';
import Join from 'components/account/Join';
import Tab from 'components/account/Tab';
import AccountImg from '../assets/account.png';

const Account: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('로그인');
  const onLoginSubmit = (form: {email: string; password: string}) => {
    console.log(form);
  }
  const onJoinSubmit = (form: {name: string, email: string, password: string, confirmPwd: string}) => {
    console.log(form);
  }

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <Wrapper>
      <ImgContainer>
      <div>
        <HiSpan>Hi,</HiSpan><br/>
        <Text>We will be your </Text><StudyMate>Study Mate</StudyMate>
      </div>
        <Img src={AccountImg} alt="Sign up or log in" />
      </ImgContainer>
      <div>
        <Tab
          tabs={['로그인', '회원가입']}
          selectedTab={selectedTab}
          onSelectTab={handleTabSelect}
        />
        {selectedTab === '로그인' ? <Login onSubmit={onLoginSubmit}/> : <Join onSubmit={onJoinSubmit}/>}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #586FC5;
  box-sizing: border-box;
  justify-content: space-evenly;
  align-items: center;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

const HiSpan = styled.span`
  font-size: 48px;
  color: #FFDA58;
  font-weight: 600;
`;

const Text = styled.span`
  font-size: 32px;
  color: #ECECEC;
  font-weight: 600;
`;

const StudyMate = styled.span`
  font-size: 32px;
  color: #FFDA58;
  font-weight: 600;
`;

const Img = styled.img`
  width: 520px;
  height: 394;
`;

export default Account;