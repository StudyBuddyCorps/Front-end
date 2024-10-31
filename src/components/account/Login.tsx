import React, { useState } from "react";
import styled, { css } from "styled-components";
import Message from "../../assets/images/message.png";
import Lock from "../../assets/images/lock.png";
import GoogleButton from "./GoogleButton";
import KakaoButton from "./KakoButton";
import UnView from "../../assets/images/hideView.png";
import View from "../../assets/images/notHideView.png";

interface LoginProps {
  onSubmit: (form: { email: string; password: string }) => void;
}

function Login({ onSubmit }: LoginProps) {
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      email: "",
      password: "",
    });
  };

  // input 값이 다 입력되어 있는지 체크
  const isFormValid = email !== "" && password !== "";

  // 눈 아이콘 클릭 시 비밀번호가 보임
  const handleTogglePwdVisibility = () => {
    setShowPwd((prevState) => !prevState);
  };

  return (
    <Wrapper>
      <LoginForm onSubmit={handleSubmit}>
        <div>
          <LoginLabel>이메일</LoginLabel>
          <InputContainer>
            <Img src={Message} alt="email" />
            <Input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={onChange}
            />
          </InputContainer>
        </div>
        <div>
          <LoginLabel>비밀번호</LoginLabel>
          <InputContainer>
            <Img src={Lock} alt="password" />
            <Input
              type={showPwd ? "text" : "password"}
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={onChange}
            />
            <ViewImg
              src={showPwd ? View : UnView}
              alt={showPwd ? "Visible View" : "Hidde View"}
              onClick={handleTogglePwdVisibility}
            />
          </InputContainer>
        </div>
        <Button type="submit" enabled={isFormValid}>
          로그인
        </Button>
      </LoginForm>
      <Other>
        <Text>또는 다음으로 로그인</Text>
        <Icons>
          <GoogleButton />
          <KakaoButton></KakaoButton>
        </Icons>
      </Other>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 35vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 0 0 15px 15px;
  background-color: #ffffff;
  padding: 0 5vw;
  box-sizing: border-box;
  gap: 4.5vh;

  @media (max-height: 808px) {
    height: 500px;
    gap: 30px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 43px;
  margin-top: 7vh;
`;

const LoginLabel = styled.label`
  font-size: 15px;
  color: #000000;
  font-weight: 600;
`;

const InputContainer = styled.div`
  position: relative;
  margin-top: 8px;
`;

const Img = styled.img`
  position: absolute;
  left: 5px; /* 아이콘의 왼쪽 여백 설정 */
  top: 50%;
  transform: translateY(-50%);
`;

const Input = styled.input`
  padding-left: 40px; /* 아이콘과 겹치지 않게 텍스트 여백 조절 */
  width: -webkit-fill-available;
  height: 46px;
  border-radius: 5px;
  border: 1px solid #cdcdcd;
  box-sizing: border-box;
  font-size: 15px;
  &::placeholder {
    color: #cdcdcd;
  }
`;

const ViewImg = styled.img`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
`;

const Button = styled.button<{ enabled: boolean }>`
  height: 52px;
  border: none;
  border-radius: 10px;
  background-color: #ececec;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  cursor: not-allowed;
  ${(props) =>
    props.enabled &&
    css`
      background-color: #2a3f5f;
      cursor: pointer;
    `}
`;

const Other = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
`;

const Text = styled.div`
  font-size: 10px;
  font-weight; 300;
  color: 131211;
`;

const Icons = styled.div`
  display: flex;
  gap: 3.5vw;
`;

export default Login;
