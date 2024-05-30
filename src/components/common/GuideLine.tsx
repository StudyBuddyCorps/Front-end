import React from 'react';
import styled from 'styled-components';
import VideoPlayer from './VideoPlayer';


const Guideline: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <VideoContainer>
          <VideoPlayer />
          <Overlay>
            <Rectangle />
            <Circle />
          </Overlay>
        </VideoContainer>
        <Text>보다 명확한 피드백을 위해<br/>화면에 맞춰 앉아 주세요!</Text>      
      </Container>

      <Info>잠시 후 스터디룸에 입장합니다.</Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background2};
  justify-content: space-between;
  padding: 200px 50px 80px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 45vw;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const Circle = styled.div`
  width: 34%;
  padding-bottom: 34%;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.main};
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, 0); // 네모 위로 위치 조정
`;

const Rectangle = styled.div`
  width: 70%;
  height: 21%;
  border: 2px solid ${({ theme }) => theme.colors.main};
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0); // 중앙 정렬
`;

const Text = styled.div`
  color: ${({ theme }) => theme.colors.white02};
  font-size: 32px;
  font-family: NotoSansSemiBold;
  margin-top: 20px;
  text-align: center;
`;

const Info = styled.div`
  color: ${({ theme }) => theme.colors.main};
  font-size: 24px;
  font-family: NotoSansMedium;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default Guideline;