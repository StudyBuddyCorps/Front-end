import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Out from 'assets/images/Out.png';

interface PausePomodoroModalProps {
  pomodoroCount: number;
  onBreakEnd: () => void;
}

const PausePomodoro:React.FC<PausePomodoroModalProps> = ({ pomodoroCount, onBreakEnd }) => {
  const isLongBreak = pomodoroCount % 4 === 0;
  const initialTime = isLongBreak ? 15 * 60 : 5 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime); 
  }, [pomodoroCount, initialTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onBreakEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onBreakEnd]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const totalDuration = initialTime;
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;
  
  return (
    <Container>
      <Content>
        <Time>{formatTime(timeLeft)}</Time>
        <ProgressBar>
          <Progress style={{ width: `${progress}%` }} />
        </ProgressBar>
        <Text>휴식시간입니다.<br />잠시 후 뽀모도로 {pomodoroCount}회 사이클이 시작됩니다!</Text>
      </Content>
      <BottomText>
        {/* <OutImg src={Out}> 스터디룸 나가기</OutImg> */}
      </BottomText>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background2};
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  padding: 30vh 50px 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Time = styled.div`
  font-size: 48px;
  color: ${({ theme }) => theme.colors.white02};
  font-family: notoSansSemiBold;
`;

const ProgressBar = styled.div`
  width: 80%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.white02};
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main};
  transition: width 0.5s ease;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.colors.white02};
  font-size: 32px;
  font-family: notoSansSemiBold;
  text-align: center;
`;

const BottomText = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.white02};
  font-size: 24px;
  font-family: NotoSansMedium;
  align-items: baseline;
  justify-content: flex-end;

  span{
    color: ${({ theme }) => theme.colors.main};
    font-size: 64px;
    font-family: NotoSansRegular;
  }
`;

const OutImg = styled.img`

`;

export default PausePomodoro;