import styled from "styled-components";
import Kakao from "../../assets/images/kakao.png";
import { handleKakaoLogin } from "services/authServices";

const KakaoButton = () => {
  return (
    <Icon onClick={handleKakaoLogin}>
      <img src={Kakao} alt="kakao login" />
      <IconName>Kakao</IconName>
    </Icon>
  );
};

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const IconName = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: #181d24;
`;

export default KakaoButton;
