import React, { useState } from "react";
import styled from "styled-components";
import Login from "components/account/Login";
import Join from "components/account/Join";
import Tab from "components/account/Tab";
import AccountImg from "../assets/images/account.png";
import { useNavigate } from "react-router-dom";
import { handleSignup } from "services/userServices";
import { handleLogin } from "services/authServices";

const Account: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("로그인");
  const navigate = useNavigate();

  const onLoginSubmit = async (form: { email: string; password: string }) => {
    try {
      const success = await handleLogin(form.email, form.password);
      if (success?.ok) {
        navigate("/home");
      } else {
        console.error(success?.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const onJoinSubmit = async (form: {
    name: string;
    email: string;
    password: string;
    confirmPwd: string;
  }) => {
    try {
      const success = await handleSignup(
        form.email,
        form.password,
        form.confirmPwd,
        form.name
      );
      if (success?.ok) {
        navigate("/home");
      } else {
        console.error(success?.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
    }
  };

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <Wrapper>
      <ImgContainer>
        <div>
          <HiSpan>Hi,</HiSpan>
          <br />
          <Text>We will be your </Text>
          <StudyMate>Study Mate</StudyMate>
        </div>
        <Img src={AccountImg} alt="Sign up or log in" />
      </ImgContainer>
      <div>
        <Tab
          tabs={["로그인", "회원가입"]}
          selectedTab={selectedTab}
          onSelectTab={handleTabSelect}
        />
        {selectedTab === "로그인" ? (
          <Login onSubmit={onLoginSubmit} />
        ) : (
          <Join onSubmit={onJoinSubmit} />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #586fc5;
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
  color: #ffda58;
  font-weight: 600;
`;

const Text = styled.span`
  font-size: 32px;
  color: #ececec;
  font-weight: 600;
`;

const StudyMate = styled.span`
  font-size: 32px;
  color: #ffda58;
  font-weight: 600;
`;

const Img = styled.img`
  width: 520px;
  height: 394px;
`;

export default Account;
