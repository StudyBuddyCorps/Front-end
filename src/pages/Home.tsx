import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../assets/images/avatar_woman.png";
import Btn_Enter from "../assets/images/btn_entrance.png";
import Btn_Create from "../assets/images/btn_create.png";
import Header from "shared/Header";
import Layout from "shared/Layout";
import Time from "shared/Time";
import Guideline from "components/common/GuideLine";
import useModal from "hooks/useConfirm";
import ConfirmModal from "components/common/ConfirmModal";

const Home: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { isConfirmVisible, confirmMessage, showConfirm, handleConfirm, handleCancel } = useModal();
  const navigate = useNavigate();

  // 임의의 시간 간격으로 progress 값 증가
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        clearInterval(interval);
      }
    }, 1000); // 1초마다 증가
    return () => clearInterval(interval);
  }, [progress]);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/room/:roomId');
    }, 6000);
  };

  const handleProfileClick = () => {
    showConfirm('로그아웃 하시겠습니까?', logout);
  };

  const logout = () => {
    navigate('/');
    console.log('로그아웃합니다.');
  }

  return (
    <Layout>
      { loading ? (
        <Guideline />
      ) : (
        <>
          <Header
            title="Home"
            dis="운을 믿지 말고 요행을 기대 말고 나의 철저한 준비와 노력만을 믿어라"
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
              <StyleLink to="/room">
                <img src={Btn_Create} alt="Create a new StudyRoom" />
              </StyleLink>
            </SDiv>
          </Study>

          {/* 오늘의 총 공부 시간 */}
          <Time
            title="오늘의 총 공부 시간"
            totalTime="03 : 30 : 01"
            goalTime="06 : 00 : 00"
          ></Time>
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
    </Layout>
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
