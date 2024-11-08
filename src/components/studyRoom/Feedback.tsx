import React from 'react';
import styled from "styled-components";

interface FeedbackProps {
  showChat: boolean;
  message: string | null;
  time: number;
}

const formatTime = (time: number) => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = `${Math.floor(time / 60)}`;
  const getMinutes = `0${parseInt(minutes) % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

const Feedback: React.FC<FeedbackProps> = ({ showChat, message, time }) => {
  if (!message) return null;
  
  return (
    <Container showChat={showChat}>
      <PinkBar />
      <Contents>
        <Message>{message}</Message>
        <Time>{formatTime(time)}</Time>        
      </Contents>
    </Container>
  );
};

const Container = styled.div<{ showChat: boolean }>`
  display: flex;
  gap: 20px;
  width: ${({ showChat }) => (showChat ? '100%' : 'calc(100vw - 100px)')};
  height: fit-content;
  background-color: transparent;
`;

const PinkBar = styled.div`
  width: 14px;
  height: 66px;
  border: 1px solid ${({ theme }) => theme.colors.highlight};
  background-color: ${({ theme }) => theme.colors.highlight};
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
  width:  calc(100% - 34px); ;
  background-color: rgb(24, 29, 36, 0.5);
  color: ${({ theme }) => theme.colors.white02};
  padding: 0 36px;
  border: none;
  border-radius: 2px;
`;

const Message = styled.div`
  flex: 1;
  font-size: 24px;
  font-family: NotoSansSemiBold;
`;

const Time = styled.div`
  font-size: 24px;
  font-family: NotoSansRegular;
`;

export default Feedback;