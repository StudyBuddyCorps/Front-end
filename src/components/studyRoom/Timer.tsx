import React from "react";
import styled from "styled-components";

interface TimerProps {
  time: number;
}

const formatTime = (time: number) => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = `${Math.floor(time / 60)}`;
  const getMinutes = `0${parseInt(minutes) % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

const Timer: React.FC<TimerProps> = ({ time }) => {
  return (
    <Container>
      {formatTime(time)}
    </Container>
  );
};

const Container = styled.div`
  font-size: 64px;
  font-family: NotoSansMedium;
  color: ${({ theme }) => theme.colors.main};
`;

export default Timer;