import React, { useState } from "react";
import styled from "styled-components";
import ProgressBar from "components/home/ProgressBar";
import Flag from "assets/images/flag.png";
import { timeToString } from "utils/timeLine";

interface TimeProps {
  title: string;
  totalTime: number;
  goalTime: number;
}

const Time: React.FC<TimeProps> = (props: TimeProps) => {
  const total = timeToString(props.totalTime);
  const goal = timeToString(props.goalTime);
  const prog = (props.totalTime / props.goalTime) * 100;
  return (
    <Container>
      <Title>
        <img src={Flag} alt="today's study time" />
        <span>{props.title}</span>
      </Title>
      <TotalStudyTime>{total}</TotalStudyTime>
      <Percent>
        <ProgressBar progress={prog} />
        <GoalStudyTime>{goal}</GoalStudyTime>
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
