import styled, { css } from "styled-components";
import Google from "../../assets/images/google.png";
import { handleGoogleLogin } from "services/authServices";

const GoogleButton = () => {
  return (
    <Icon onClick={handleGoogleLogin}>
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
