import React, { useState } from "react";
import styled from "styled-components";
import ProgressBar from "components/home/ProgressBar";
import Flag from "assets/images/flag.png";

interface TimeProps {
  title: string;
  totalTime: string;
  goalTime: string;
}

const Time: React.FC<TimeProps> = (props: TimeProps) => {
  return (
    <Container>
      <Title>
        <img src={Flag} alt="today's study time" />
        <span>{props.title}</span>
      </Title>
      <TotalStudyTime>{props.totalTime}</TotalStudyTime>
      <Percent>
        <ProgressBar progress={88} />
        <GoalStudyTime>{props.goalTime}</GoalStudyTime>
      </Percent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 80%;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Title = styled.div`
  display: flex;
  gap: 15px;
  font-size: 24px;
  font-family: NotoSansBold;
  align-items: center;
`;

const TotalStudyTime = styled.div`
  display: flex;
  font-size: 48px;
  font-family: InterMedium;
  justify-content: center;
  margin-bottom: 10px;
`;

const Percent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5vw;
`;

const GoalStudyTime = styled.div`
  font-size: 36px;
  font-family: InterLight;
  color: #cdcdcd;
`;

export default Time;
