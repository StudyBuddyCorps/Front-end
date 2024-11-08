import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import VideoPlayer from "components/common/VideoPlayer";
import Noti from 'assets/images/Noti2.png';
import Feedback from "components/studyRoom/Feedback";
import Timer from "components/studyRoom/Timer";
import Controls from "components/studyRoom/Controls";
import Pause from "components/studyRoom/Pause";
import Chat from "components/studyRoom/Chat";
import ChatImg from "assets/images/chat.png";
import { getToken } from "../utils/localStroage";

const StudyRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const [ time, setTime ] = useState(0);
  const [ paused, setPaused ] = useState(false);
  const [whiteNoise, setWhiteNoise] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showResume, setShowResume] = useState(false);
  const [remainingTime, setRemainingTime] = useState(15 * 60);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showChat, setShowChat] = useState(false);
  const accessToken = getToken();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(document.createElement('canvas'));
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackTime, setFeedbackTime] = useState<number | null>(0);

  // 피드백 메시지 목록
  const postureMessages = ["자세가 바르지 않아요!", "허리를 펴세요!", "자세 불량!!!", "바른 자세로 집중하세요!", "똑바로 앉고 집중!"];
  const phoneMessages = ["핸드폰 금지!!", "핸드폰을 멀리 두세요!", "핸드폰에 집중하지 마세요!", "핸드폰과는 거리 두기 필수!", "핸드폰 부셔버린다^^"];
  const sleepMessages = ["자면 안돼!!", "일어나! 일어나!!", "자는 중이에요! 눈을 떠요!", "잠은 죽어서 자자ㅎㅎ", "잠에서 깨세요!"];

  // studyroom 가져오기
  useEffect(() => {
    console.log("Fetched roomId from URL:", roomId);
    if (!roomId) return;
    const fetchUserId = async () => {
      try {
        const response = await fetch(`http://localhost:8080/studyroom/${roomId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId);
          console.log("userId: ", data.userId);
        } else {
          console.error("Failed to fetch userId");
        }
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    fetchUserId();
  }, [roomId, accessToken]);

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
            console.log("request: ", formData);
            const currentTime = time + 10;
            if (result.bad_posture) {
              setFeedbackMessage(postureMessages[Math.floor(Math.random() * postureMessages.length)]);
              setFeedbackTime(currentTime);
            } else if (result.is_holding_phone) {
              setFeedbackMessage(phoneMessages[Math.floor(Math.random() * phoneMessages.length)]);
              setFeedbackTime(currentTime);
            } else if (result.is_sleeping) {
              setFeedbackMessage(sleepMessages[Math.floor(Math.random() * sleepMessages.length)]);
              setFeedbackTime(currentTime);
            } else {
              setFeedbackMessage(null);
              setFeedbackTime(null);
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
  }, [paused, time]);

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
        window.location.href = `/studyroom/${roomId}/result`;
      }, 15 * 60 * 1000); // 15분 후 이동

      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setRemainingTime(15 * 60); // Reset remaining time
    }
  }, [showResume]);

  const handlePause = async () => {
    try {
      const response = await fetch(`http://localhost:8080/studyroom/${roomId}/pause`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Pause/Resume Response:", data);
        setPaused(true);
        setShowResume(true);
      } else {
        console.error("Failed to pause/resume study room.");
        console.log("Fetched roomId from URL:", roomId);
      }
    } catch (error) {
      console.error("Error pausing/resuming study room:", error);
    }
  };

  const handleResume = () => {
    setPaused(false);
    setShowResume(false);
  };

  const handleStop = async () => {
    if (!roomId || !userId) return;
    try {
      const response = await fetch(`http://localhost:8080/studyroom/${roomId}/stop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Stop Room Response:", data);
        window.location.href = `/studyroom/${roomId}/result`;
      } else {
        console.error("Failed to stop study room.");
      }
    } catch (error) {
      console.error("Error stopping study room:", error);
    }
  };

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
            <VideoPlayer videoRef={videoRef}/>
          </StyledVideoPlayer>
        </VideoContainer>
        {feedbackMessage && (
          <Feedback showChat={showChat} message={feedbackMessage} time={feedbackTime ?? 0}/>
        )}
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
      <audio ref={audioRef} src={require('assets/audio/whitenoise.mp3')} />
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