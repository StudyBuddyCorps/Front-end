import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../assets/images/avatar_woman.png";
import Btn_Enter from "../assets/images/btn_entrance.png";
import Btn_Create from "../assets/images/btn_create.png";
import Header from "shared/Header";
import MainLayout from "components/common/Layout/MainLayout";
import Time from "components/common/Time";
import Guideline from "components/common/GuideLine";
import useModal from "hooks/useConfirm";
import ConfirmModal from "components/common/ConfirmModal";
import Footer from "components/common/Layout/Footer";
import { handleLogout, checkAccessToken } from "services/authServices";
import { getToken } from "../utils/localStroage";
import axios from "axios";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showGuideline, setShowGuideline] = useState(false);
  const [phrase, setPhrase] = useState<string>("운을 믿지 말고 요행을 기대 말고 나의 철저한 준비와 노력만을 믿어라");
  const [goal, setGoal] = useState<number>(360);
  const wsRef = useRef<WebSocket | null>(null);

  const {
    isConfirmVisible,
    confirmMessage,
    showConfirm,
    handleConfirm,
    handleCancel,
  } = useModal();
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("Access token is missing");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/users/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data;
        setPhrase(user.phrase && user.phrase.content ? user.phrase.content : "빡공하쇼");
        setGoal(user.goal || 360);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, [token]);

  const handleButtonClick = async () => {
    setShowGuideline(true);
  
    if (!token) {
      console.error("Access token is missing.");
      setShowGuideline(false);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/studyroom/defaultstart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error("스터디룸 생성 및 시작 실패:", response.statusText);
        return;
      }
  
      const data = await response.json();
  
      const studyRoomId = data.room?.roomId;
      if (!studyRoomId) {
        console.error("Room ID (_id) is missing from the response.");
        return;
      }
  
      // WebSocket 연결
      wsRef.current = new WebSocket("ws://localhost:8080");
      wsRef.current.onopen = () => {
        console.log("WebSocket connection opened.");
        wsRef.current?.send(JSON.stringify({ type: "joinRoom", roomId: studyRoomId }));
      };
  
      wsRef.current.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        console.log("WebSocket message received:", messageData);
  
        if (messageData.type === "roomStatus") {
          console.log(`Room Status Update: ${messageData.status}`);
        }
      };
  
      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed.");
      };
  
      // 5초 후 스터디룸으로 이동
      setTimeout(() => {
        setShowGuideline(false);
        navigate(`/studyroom/${studyRoomId}`);
      }, 5000);
    } catch (error) {
      console.error("스터디룸 생성 요청 오류:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleProfileClick = () => {
    showConfirm("로그아웃 하시겠습니까?", logout);
  };

  const logout = async () => {
    try {
      const result = await handleLogout();
      if (result) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const success = checkAccessToken();
    console.log(success);
    if (!success) {
      navigate("/");
      console.log("인증에 실패하였습니다. 다시 시도하세요.");
    } else {
      console.log("로그인 성공");
    }
  }, []);

  return (
    <MainLayout>
      {showGuideline ? (
        <Guideline />
      ) : (
        <>
          <Header
            title="Home"
            dis={phrase}
          >
            <Profile src={Avatar} alt="Profile" onClick={handleProfileClick} />
          </Header>
          {/* 스터디룸 입장 및 생성 */}
          <Study>
            <SDiv>
              <STitle>스터디룸 입장</STitle>
              <SText>미리 설정한 스터디룸에서 공부를 시작하세요.</SText>
              <Button onClick={handleButtonClick}>
                <img src={Btn_Enter} alt="Enter the StudyRoom" />
              </Button>
            </SDiv>
            <SDiv>
              <STitle>스터디룸 생성</STitle>
              <SText>새로운 스터디룸을 만들어보세요.</SText>
              <StyleLink to="/studyroom">
                <img src={Btn_Create} alt="Create a new StudyRoom" />
              </StyleLink>
            </SDiv>
          </Study>

          {/* 오늘의 총 공부 시간 */}
          <Footer>
            <Time
              title="오늘의 총 공부 시간"
              totalTime="02 : 30 : 01"
              goalTime={`${String(Math.floor(goal / 60)).padStart(2, '0')} : ${String(goal % 60).padStart(2, '0')} : 00`}
            ></Time>
          </Footer>
        </>
      )}
      {isConfirmVisible && (
        <ConfirmModal
          children={confirmMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          confirmText="예"
          cancelText="아니오"
        />
      )}
    </MainLayout>
  );
};

const Profile = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

const Study = styled.div`
  display: flex;
  min-height: 41vh;
  background-color: #f5f5f5;
  padding: 43px;
  box-sizing: border-box;
  gap: 15vw;
  @media (min-width: 1280px) {
    gap: 22vw;
  }
`;

const Content = styled.div`
  height: 100%;
`;

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const STitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
`;

const SText = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #586fc5;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 10px;
`;

const Button = styled.button`
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
`;

export default Home;
