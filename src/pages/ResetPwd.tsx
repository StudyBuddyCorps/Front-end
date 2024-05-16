import React, { useState } from "react";
import styled, { css } from "styled-components";
import Rock from "../assets/rock.png";
import UnView from "../assets/hideView.png";
import View from "../assets/notHideView.png";

const ResetPwd = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    alert('Password changed successfully');
  };

  // 눈 아이콘 클릭 시 비밀번호가 보임
  const handleTogglePwdVisibility = () => {
    setShowPwd(prevState => !prevState);
  };
  const handleToggleConfirmPdVisibility = () => {
    setShowConfirmPwd(prevState => !prevState);
  };

  const isFormValid = newPassword !== '' && confirmPassword !== '';

  return (
    <Wrapper>
      <img src={Rock} alt="reset password" />
      <Title>비밀번호 변경</Title>
      <ResetForm onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type={showPwd ? 'text' : 'password'}
            name="password"
            placeholder='신규 비밀번호 입력'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <ViewImg
            src={ showPwd ? View : UnView }  
            alt={ showPwd ? "View" : "Hidde View" }
            onClick={handleTogglePwdVisibility} 
          />
        </InputContainer>
        <InputContainer>
          <Input
            type={showConfirmPwd ? 'text' : 'password'}
            name="confirmPwd"
            placeholder='신규 비밀번호 확인'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <ViewImg 
            src={ showConfirmPwd ? View : UnView } 
            alt={ showConfirmPwd ? "View" : "Hidde View" }
            onClick={handleToggleConfirmPdVisibility} 
          />
          </InputContainer> 
          <Button type="submit" enabled={isFormValid}>확인</Button>
      </ResetForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => (theme.colors.black02 )};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: ${({theme}) => (theme.colors.white02)};
  font-size: 40px;
  font-family: NotoSansSemiBold;
`;

const ResetForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 7vh;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding-left: 20px;
  width: -webkit-fill-available;
  height: 50px;
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

const Button = styled.button<{ enabled: boolean}>`
  width: 500px;
  height: 52px;
  border: none;
  border-radius: 10px;
  background-color: #ECECEC;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 600;
  cursor: not-allowed;
  margin-top: 30px;
  ${props => 
    props.enabled &&
    css`
      background-color: ${({theme}) => (theme.colors.subMain)};
      cursor: pointer;
    `
  }
`;

export default ResetPwd;