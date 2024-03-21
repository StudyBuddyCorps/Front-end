import React from "react";
import styled from "styled-components";
import Message from "../../assets/message.png";
import Lock from "../../assets/lock.png";
import Kakao from "../../assets/kakao.png";
import Google from "../../assets/google.png";
import UnView from "../../assets/hideView.png";
import Profile from "../../assets/profile.png";

interface JoinProps {
  onLogin: (name: string, email: string, password: string) => void;
}

const Join = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  return (
    <Wrapper>
      <JoinForm>
        <div>
          <JoinLabel>이름</JoinLabel>
          <InputContainer>
            <Img src={Profile} alt="name" />
            <Input 
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
            />
          </InputContainer>          
        </div>
        <div>
          <JoinLabel>이메일</JoinLabel>
          <InputContainer>
            <Img src={Message} alt="email" />
            <Input 
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
            />
          </InputContainer>          
        </div>
        <div>
          <JoinLabel>비밀번호</JoinLabel>
          <InputContainer>
            <Img src={Lock} alt='password' />
            <Input
              type='password'
              placeholder='영문자, 숫자, 특수문자 포함 최소 8~25자'
              value={password}
            />
            <ViewImg src={UnView} alt="Hidde View" />
          </InputContainer>   
          <InputContainer>
            <Img src={Lock} alt='password' />
            <Input
              type='password'
              placeholder='비밀번호 확인'
              value={password}
            />
            <ViewImg src={UnView} alt="Hidde View" />
          </InputContainer>       
        </div>      
        <Button>회원가입</Button>
      </JoinForm>
      <Other>
        <Text>또는 다음으로 로그인</Text>
        <Icons>
          <Icon>
            <img src={Kakao} alt='kakao login' />
            <IconName>Google</IconName>
          </Icon>
          <Icon>
            <img src={Google} alt='google login' />
            <IconName>Kakao</IconName>
          </Icon>
        </Icons>
      </Other>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 36vw;
  height: 79vh;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 0 0 15px 15px;
  background-color: #FFFFFF;
  padding: 0 5vw;
  box-sizing: border-box;
  justify-content: space-between;
`;

const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5vh;
  margin-top: 6vh;
`;

const JoinLabel = styled.label`
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
  border: 1px solid #CDCDCD;
  box-sizing: border-box;
  font-size: 15px;
  &::placeholder {
    color: #CDCDCD;
  }
`;

const ViewImg = styled.img`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
`;

const Button = styled.button`
  height: 52px;
  border: none;
  border-radius: 10px;
  background-color: #2A3F5F;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
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

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const IconName =  styled.div`
  font-size: 10px;
  font-weight: 400;
  color: #181D24;
`;

export default Join;