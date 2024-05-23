import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import VideoPlayer from "components/common/VideoPlayer";
import Noti from 'assets/images/Noti2.png';
import Feedback from "components/studyRoom/Feedback";
import Timer from "components/studyRoom/Timer";
import Controls from "components/studyRoom/Controls";

const StudyRoom: React.FC = () => {
  const [ time, setTime ] = useState(0);
  const [ paused, setPaused ] = useState(false);
  const [whiteNoise, setWhiteNoise] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handlePause = () => setPaused(!paused);
  const handleStop = () => window.location.href = '/room/:roomId/result';
  const handleWhiteNoise = () => setWhiteNoise(!whiteNoise);

  return (
    <Wrapper>
      <VideoContainer>
        <BuddyContainer>
          <BuddyImg src={Noti} alt="Buddy image" />
        </BuddyContainer>
        <VideoPlayer />
      </VideoContainer>
      <Feedback />
      <Timer time={time}/>
      <Controls 
        onPause={handlePause} 
        onStop={handleStop} 
        onWhiteNoise={handleWhiteNoise} 
      />
      <audio ref={audioRef} src={require('assets/audio/Winner.mp3')} loop />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.background2};
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  padding: 100px 50px;
`;

const VideoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const BuddyContainer = styled.div`
  position: relative;
  width: 45vw;
  height: calc(40vw*0.7);
  background-color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 5px;
`;

const BuddyImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  width: 40vw;
`;

export default StudyRoom;