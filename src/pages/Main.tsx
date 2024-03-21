import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MainImg from "../assets/main.png";
import Icon_Play from "../assets/play.png";

const Main = () => {
  return (
    <Wrapper>
      <RSection>
        <Img src={MainImg} alt="Join StudyBuddy" />
      </RSection>
      <LSection>
        <Title>
          <span>가상의 공간에서</span><br />
          <span>삐삐와 공부에 집중해요!</span>
        </Title>
        <Text>
          <span>삐삐가 공부에 집중할 수 있게</span><br />
          <span>잔소리를 해줘요!</span>
        </Text>
        <Button to='/login'><img src={Icon_Play} alt="start button" />공부하기</Button>
      </LSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  background: linear-gradient(180deg, #FFDA58 0%, #FFDA58 5%, #FFFFFF 16%);
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  gap: 68px;

  @media (max-width: 1280px) {
    gap: 10px;
  }
`;

const RSection = styled.div`
  width: 660px;
  height: 530px;

  @media (max-width: 1280px) {
    max-width: 608px;
    max-height: 503px;
  }
`;

const Img = styled.img`
  width: 660px;
  height: 530px;

  @media (max-width: 1280px) {
    max-width: 608px;
    max-height: 503px;
  }
`;

const LSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1280px) {
    gap: 15px;
  }
`;

const Title = styled.div`
  color: #000000;
  font-size: 50px;
  font-weight: 600;
  white-space: nowrap;

  @media (max-width: 1280px) {
    font-size: 48px;
  }
`;

const Text = styled.div`
  color: #000000;
  font-size: 34px;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 1280px) {
    font-size: 32px;
  }
`;

const Button = styled(Link)`
  display: flex;
  width: 220px;
  height: 70px;
  background-color: #2A3F5F;
  color: #FFFFFF;
  font-size: 24px;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  gap: 13px;
  text-decoration: none;
`;

export default Main;