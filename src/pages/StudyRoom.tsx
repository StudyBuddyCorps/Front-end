import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import VideoPlayer from "components/common/VideoPlayer";
import Noti from 'assets/images/Noti2.png';
import Feedback from "components/studyRoom/Feedback";
import Timer from "components/studyRoom/Timer";
import Controls from "components/studyRoom/Controls";
import Pause from "components/studyRoom/Pause";
import Chat from "components/studyRoom/Chat";
import ChatImg from "assets/images/chat.png";

const StudyRoom: React.FC = () => {
  const [ time, setTime ] = useState(0);
  const [ paused, setPaused ] = useState(false);
  const [whiteNoise, setWhiteNoise] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showResume, setShowResume] = useState(false);
  const [remainingTime, setRemainingTime] = useState(15 * 60);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!paused) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    if (audioRef.current) {
      if (whiteNoise) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [whiteNoise]);

  useEffect(() => {
    if (showResume) {
      timeoutRef.current = setTimeout(() => {
        window.location.href = '/studyroom/:roomId/result';
      }, 15 * 60 * 1000); // 15분 후 이동

      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setRemainingTime(15 * 60); // Reset remaining time
    }
  }, [showResume]);

  const handlePause = () => {
    setPaused(true);
    setShowResume(true);
  };

  const handleResume = () => {
    setPaused(false);
    setShowResume(false);
  };

  const handleStop = () => window.location.href = '/room/:roomId/result';
  const handleWhiteNoise = () => setWhiteNoise(!whiteNoise);
  const toggleChat = () => setShowChat(!showChat);

  return (
    <Wrapper>
      <MainContent showChat={showChat}>
        <VideoContainer>
          <BuddyContainer>
            <BuddyImg src={Noti} alt="Buddy image" />
          </BuddyContainer>
          <StyledVideoPlayer>
            <VideoPlayer />
          </StyledVideoPlayer>
        </VideoContainer>
        <Feedback showChat={showChat} />
        <ControlContent>
          <div></div>
          <CenterDiv>
            <Timer time={time} />
            <Controls
              onPause={handlePause}
              onStop={handleStop}
              onWhiteNoise={handleWhiteNoise}
            />          
          </CenterDiv>
          {showChat ? <div></div> : (
            <ChatIconContainer onClick={toggleChat}>
              <ChatIcon src={ChatImg} alt="Chat Icon" />
            </ChatIconContainer>
          )}
        </ControlContent>
      </MainContent>
      <Chat showChat={showChat} toggleChat={toggleChat} />
      <audio ref={audioRef} src={require('assets/audio/Winner.mp3')} loop />
      {showResume && <Pause onResume={handleResume} remainingTime={remainingTime} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.background2};
  width: 100vw;
  height: 100vh;
  padding: 100px 50px;
  box-sizing: border-box;
`;

const MainContent = styled.div<{ showChat: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: width 0.3s ease;
  width: ${({ showChat }) => (showChat ? 'calc(100% - 320px)' : '100%')};
`;

const VideoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  justify-content: space-between;
`;

const BuddyContainer = styled.div`
  position: relative;
  width: 49%;
  background-color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 5px;
  overflow: hidden;
`;

const BuddyImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  width: 40vw;
  width: 78%;
`;

const StyledVideoPlayer = styled.div`
  width: 49%;
  overflow: hidden;
  transition: width 0.3s ease;
`;

const ControlContent = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  justify-content: space-between;
`;

const CenterDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatIconContainer = styled.div`
  cursor: pointer;
`;

const ChatIcon = styled.img`
  width: 50px;
  height: 50px;
`;

export default StudyRoom;