import React from 'react';
import styled from 'styled-components';
import Play from 'assets/images/Play_duotone.png';

interface PauseModalProps {
  onResume: () => void;
  remainingTime: number;
}

const formatRemainingTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}분`;
};

const Pause:React.FC<PauseModalProps> = ({ onResume, remainingTime }) => {
  return (
    <Container>
      <Content>
        <PlayBtn src={Play} alt='play button' onClick={onResume} />
        <Text>일시 정지 되었습니다!<br />다시 시작하려면 재생 버튼을 클릭하세요.</Text>
      </Content>
      <BottomText>
        <span>{formatRemainingTime(remainingTime)}</span>
        &nbsp;후에 자동으로 종료됩니다.
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

const PlayBtn = styled.img`
  width: 200px;
  cursor: pointer;
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

export default Pause;