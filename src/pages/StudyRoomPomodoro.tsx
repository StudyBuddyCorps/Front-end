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
import Angry from "assets/videos/Angry.mp4";
import Blink from "assets/videos/Blink.mp4";
import BlinkFast from "assets/videos/BlinkFast.mp4";
import Hello from "assets/videos/Hello.mp4";
import Scratch from "assets/videos/Scratch.mp4";
import ShakeHead from "assets/videos/ShakeHead.mp4";
import Stare from "assets/videos/Stare.mp4";
import Sleep1 from "assets/audio/v1_sleep1.mp3";
import Sleep2 from "assets/audio/v1_sleep2.mp3";
import Posture from "assets/audio/v1_posture1.mp3";
import Phone1 from "assets/audio/v1_phone1.mp3";
import Phone2 from "assets/audio/v1_phone2.mp3";
import Compliment from "assets/audio/v1_complimet.mp3";

const StudyRoomPomodoro = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const token = getToken();
  const [showChat, setShowChat] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
  const canvasRef = useRef<HTMLCanvasElement | null>(document.createElement('canvas'));

  const [currentVideo, setCurrentVideo] = useState(Hello);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackTime, setFeedbackTime] = useState<number | null>(0);
  const notiVoiceRef = useRef<HTMLAudioElement>(null);

  const negativeVideos = [ShakeHead, Stare, Angry];
  const neutralVideos = [Blink, BlinkFast, Scratch];

  const postureMessages = ["자세가 바르지 않아요!", "허리를 펴세요!"];
  const phoneMessages = ["핸드폰 금지!!", "핸드폰을 멀리 두세요!"];
  const sleepMessages = ["자면 안돼!!", "일어나!"];

  const audioFiles = {
    is_sleeping: [Sleep1, Sleep2],
    bad_posture: [Posture],
    is_holding_phone: [Phone1, Phone2],
    praise: [Compliment],
  };

  const playAudio = (file: string) => {
    if (notiVoiceRef.current) {
      notiVoiceRef.current.src = file;
      notiVoiceRef.current.play().catch((error) => {
        console.error("Failed to play noti voice:", error);
      });
    }
  };

  const handleFeedback = (result: any) => {
    let audioToPlay: string | null = null;

    if (result.is_holding_phone || result.bad_posture || result.is_sleeping) {
      setCurrentVideo(negativeVideos[Math.floor(Math.random() * negativeVideos.length)]);
    } else {
      setCurrentVideo(neutralVideos[Math.floor(Math.random() * neutralVideos.length)]);
    }

    if (result.is_holding_phone) {
      setFeedbackMessage(phoneMessages[Math.floor(Math.random() * phoneMessages.length)]);
      audioToPlay = audioFiles.is_holding_phone[Math.floor(Math.random() * audioFiles.is_holding_phone.length)];
    } else if (result.bad_posture) {
      setFeedbackMessage(postureMessages[Math.floor(Math.random() * postureMessages.length)]);
      audioToPlay = audioFiles.bad_posture[0];
    } else if (result.is_sleeping) {
      setFeedbackMessage(sleepMessages[Math.floor(Math.random() * sleepMessages.length)]);
      audioToPlay = audioFiles.is_sleeping[Math.floor(Math.random() * audioFiles.is_sleeping.length)];
    } else {
      setFeedbackMessage(null);
    }

    setFeedbackTime(new Date().getTime());

    if (audioToPlay) {
      playAudio(audioToPlay);
    }
  };

  // time 값을 최신으로 유지하기 위한 Ref
  const timeRef = useRef(time);
  useEffect(() => {
    timeRef.current = time;
  }, [time]);

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

  // 피드백 api
  useEffect(() => {
    const captureImage = () => {
      if (canvasRef.current && videoRef.current) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext("2d");
        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          return canvas.toDataURL("image/jpeg");
        }
      }
      return null;
    };

    const sendImageToServer = async () => {
      const image = captureImage();
      const currentTime = timeRef.current;
      if (image) {
        try {
          const byteString = atob(image.split(',')[1]);
          const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          const formData = new FormData();
          formData.append("file", blob, "capture.jpg");
          formData.append("verify", "false");
          const response = await fetch('http://3.107.8.184:5000/upload_image', {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const result = await response.json();
            handleFeedback(result);
            

            // 피드백 저장 요청
            const feedbackType = [];
            if (result.is_holding_phone) feedbackType.push("is_holding_phone");
            if (result.bad_posture) feedbackType.push("bad_posture");
            if (result.is_sleeping) feedbackType.push("is_sleeping");

            if (feedbackType.length > 0) {
              const feedbackResponse = await fetch(`http://localhost:8080/studyroom/${roomId}/feedback`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ feedbackType, time: currentTime }),
              });
  
              if (!feedbackResponse.ok) {
                console.error("Failed to save feedback to the server.");
              }
            }
          } else {
            console.error("Failed to send image to server:", response.status);
          }
        } catch (error) {
          console.error("Error sending image to server:", error);
        }
      }
    };

    if (!paused) {
      const intervalId = setInterval(() => {
        sendImageToServer();
      }, 10000);
  
      return () => clearInterval(intervalId);
    }
  }, [paused]);

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
              src = {currentVideo}
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
  background-color: #a9a9a9;
  border: none;
  border-radius: 5px;
  overflow: hidden;
`;

const BuddyVideo = styled.video`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
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
