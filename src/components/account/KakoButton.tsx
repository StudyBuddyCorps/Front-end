import styled from "styled-components";
import Kakao from "../../assets/images/kakao.png";

const KakaoButton = () => {
  const clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const redirect = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect}&response_type=code`;

  return (
    <Icon onClick={() => (window.location.href = URL)}>
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
