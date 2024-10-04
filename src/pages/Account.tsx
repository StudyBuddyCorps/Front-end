import React, { useState } from "react";
import styled from "styled-components";
import Login from "components/account/Login";
import Join from "components/account/Join";
import Tab from "components/account/Tab";
import AccountImg from "../assets/images/account.png";
import { useNavigate } from "react-router-dom";

const Account: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("로그인");
  const navigate = useNavigate();
  const onLoginSubmit = async (form: { email: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login success:", data);
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const onJoinSubmit = async (form: {
    name: string;
    email: string;
    password: string;
    confirmPwd: string;
  }) => {
    try {
      const response = await fetch("http://localhost:8080/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          nickname: form.name,
          password: form.password,
          comparePassword: form.confirmPwd,
        }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      console.log("Signup success:", data);
      navigate("/home");
    } catch (error) {
      console.error("Error during signup:", error);
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
