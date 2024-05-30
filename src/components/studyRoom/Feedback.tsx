import React from 'react';
import styled from "styled-components";

interface FeedbackProps {
  showChat: boolean;
}

const Feedback: React.FC<FeedbackProps> = ({ showChat }) => {
  return (
    <Container showChat={showChat}>
      <PinkBar />
      <Contents>
        <Message>자면 안돼!</Message>
        <Time>00 : 45 : 02</Time>        
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