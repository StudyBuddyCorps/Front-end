import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getToken, getRefreshToken, saveToken } from "../utils/localStroage";
import VideoPlayer from "components/common/VideoPlayer";
import Feedback from "components/studyRoom/Feedback";
import Timer from "components/studyRoom/Timer";
import Controls from "components/studyRoom/Controls";
import Chat from "components/studyRoom/Chat";
import PausePomodoro from "components/studyRoom/PausePomodoro";
import ChatImg from "../assets/images/chat.png"
import Pause from "components/studyRoom/Pause";

const StudyRoomPomodoro = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const token = getToken();
  const [showChat, setShowChat] = useState(false);
  const [videoSource, setVideoSource] = useState<string>("안녕.mp4");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackTime, setFeedbackTime] = useState<number | null>(0);
  const [ time, setTime ] = useState(25 * 60);
  const [ totalStudyTime, setTotalStudyTime ] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(1);
  const [ paused, setPaused ] = useState(false);
  const [ showResume, setShowResume ] = useState(false);
  const [whiteNoise, setWhiteNoise] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPausePomodoro, setShowPausePomodoro] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState(15 * 60);
  const whiteNoiseRef = useRef<HTMLAudioElement>(document.createElement("audio"));

  // 토큰 갱신
  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      console.error("No refresh token found");
      return null;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        saveToken(data.accessToken); // 새 accessToken 저장
        return data.accessToken;
      } else {
        console.error("Failed to refresh access token");
        return null;
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return null;
    }
  };

  // 스터디룸 정보 및 유저 아이디 가져오기
  const fetchStudyRoom = async () => {
    let token = getToken();

    if (!token) {
      token = await refreshAccessToken(); // 토큰 갱신 시도
      if (!token) {
        console.error("Unable to fetch: No valid access token");
        return;
      }
    }

    try {
      const response = await fetch(`http://localhost:8080/studyroom/${roomId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId);
      } else if (response.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          await fetchStudyRoom();
        }
      } else {
        console.error("Failed to fetch study room information");
      }
    } catch (error) {
      console.error("Failed to fetch study room information:", error);
    }
  };

  useEffect(() => {
    fetchStudyRoom();
  }, [roomId]);

  // 종료 버튼 handler
  const handleStop = async () => {
    if (!roomId || !userId) return;
    try {
      const obj = { time: 36000 };
      console.log(obj.toString());
      const response = await fetch(`http://localhost:8080/studyroom/${roomId}/stop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ accumulatedTime: time }),
      });

      if (response.ok) {
        window.location.href = `/studyroom/${roomId}/result`;
      } else {
        console.error("Failed to stop study room.");
      }
    } catch (error) {
      console.error("Error stopping study room:", error);
    }
  };

  useEffect(() => {
    if (showResume) {
      timeoutRef.current = setTimeout(() => {
        window.location.href = `/studyroom/${roomId}/result`;
      }, remainingTime * 1000); // 15분 후 이동

      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setRemainingTime(remainingTime); 
    }
  }, [showResume, remainingTime, roomId]);

  useEffect(() => {
    if (paused || showPausePomodoro) return; 

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime == 0) {
          clearInterval(timer);
          setShowPausePomodoro(true);
          setPomodoroCount((prevCount) => prevCount + 1);
          return 0;
        }
        setTotalStudyTime((prevTotal) => prevTotal +1);
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); 
  }, [paused, showPausePomodoro]);

  const handleBreakEnd = () => {
    setShowPausePomodoro(false);
    setTime(25 * 60);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (whiteNoise) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [whiteNoise]);

  // 일시정지 버튼 handler
  const handlePauseResume = async() => {
    try {
      const response = await fetch(
        `http://localhost:8080/studyroom/${roomId}/pause`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ accumulatedTime: time }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        const newStatus = data.status;
  
        if (newStatus === "paused") {
          setPaused(true);
          setShowResume(true);
        } else if (newStatus === "active") {
          setPaused(false);
          setShowResume(false);
        } else {
          console.error("Unexpected status:", newStatus);
        }
      } else {
        console.error("Failed to pause/resume study room.");
      }
    } catch (error) {
      console.error("Error pausing/resuming study room:", error);
    }
  };

  // 백색소음
  const handleWhiteNoise = () => {
    setWhiteNoise(!whiteNoise);

    if (whiteNoiseRef.current) {
      if (!whiteNoise) {
        whiteNoiseRef.current
          .play()
          .catch((error) => console.error("Failed to play white noise:", error));
      } else {
        whiteNoiseRef.current.pause();
      }
    }
  };

  useEffect(() => {
    if (whiteNoiseRef.current) {
      if (whiteNoise) {
        whiteNoiseRef.current
          .play()
          .catch((error) => console.error("Failed to play white noise:", error));
      } else {
        whiteNoiseRef.current.pause();
      }
    }
  }, [whiteNoise]);

  // 스터디헬퍼
  const toggleChat = () => setShowChat(!showChat);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <Wrapper>
      <MainContent showChat={showChat}>
        <VideoContainer>
          <BuddyContainer>
            <BuddyVideo
              src = {`assets/videos/${videoSource}`}
              autoPlay
              loop
              muted
            />
          </BuddyContainer>
          <StyledVideoPlayer>
            <VideoPlayer videoRef={videoRef}/>
          </StyledVideoPlayer>
        </VideoContainer>
        {feedbackMessage && (
          <Feedback showChat={showChat} message={feedbackMessage} time={feedbackTime ?? 0}/>
        )}
        <ControlContent>
          <div></div>
          <CenterDiv>
            <PomodoroDiv>
              <PomodoroCount>뽀모도로 {pomodoroCount}회</PomodoroCount>
              <TotalStudyTime>총 공부 시간: {formatTime(totalStudyTime)}</TotalStudyTime>            
            </PomodoroDiv>
            <Timer time={time} />
            <Controls
              onPause={handlePauseResume}
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
      <audio ref={whiteNoiseRef} src={require('assets/audio/whitenoise.mp3')} loop/>
      {showResume && <Pause remainingTime={remainingTime} onResume={handlePauseResume} />}
      {showPausePomodoro && <PausePomodoro pomodoroCount={pomodoroCount} onBreakEnd={handleBreakEnd} />}
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

const BuddyVideo = styled.video`
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

const PomodoroDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 44px;
`;

const PomodoroCount = styled.div`
  font-size: 20px;
  font-family: NotoSansRegular;
  color: white;
`;

const TotalStudyTime = styled.div`
  font-size: 20px;
  font-family: NotoSansRegular;
  color: white;
`;

const ChatIconContainer = styled.div`
  cursor: pointer;
`;

const ChatIcon = styled.img`
  width: 50px;
  height: 50px;
`;

export default StudyRoomPomodoro;
