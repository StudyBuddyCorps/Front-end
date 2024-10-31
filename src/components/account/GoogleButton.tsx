import { UseGoogleLoginOptions, useGoogleLogin } from "@react-oauth/google";
import styled from "styled-components";
import Google from "../../assets/images/google.png";

const GoogleButton = () => {
  const googleClient = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const options: UseGoogleLoginOptions = {
    scope: "openid profile email",
    onSuccess: (response: any) => {
      console.log("Login Success:", response);
      // 추가적으로 백엔드에 사용자 정보를 보내거나 로그인 처리
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
    flow: "auth-code",
    ux_mode: "redirect",
  };

  const googleLogin = useGoogleLogin(options);

  if (!googleClient) {
    console.error("Google Client ID is not defined in .env file.");
    return <div>Error: Google Client ID is missing</div>;
  }

  return (
    <Icon onClick={googleLogin}>
      <img src={Google} alt="google login" />
      <IconName> Google </IconName>
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

export default GoogleButton;
