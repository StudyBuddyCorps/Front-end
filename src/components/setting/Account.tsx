import styled from "styled-components";
import EditProfile from "./EditProfile";

const Account = () => {

  const handleSave = () => {

  }

  return (
    <Wrapper>
      <Profile>
        <EditProfile />
        <Title>
          안녕하세요, 홍길동 님
        </Title>          
      </Profile>
      <Edit>
        <Container>
          <Label>닉네임</Label>
          <Desciption>한글, 영문, 숫자 조합 2 ~ 18자</Desciption>
          <InputDiv>
            <Input 
              placeholder="홍길동"
            />
            <SaveBtn>중복 확인</SaveBtn>
          </InputDiv>
        </Container>
        <Container>
          <Label>이메일</Label>
          <EmailDiv>test@gmail.com</EmailDiv>
        </Container>
      </Edit>
      <BtnDiv>
        <SaveBtn onClick={handleSave}>저장</SaveBtn>
      </BtnDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid ${({ theme }) => (theme.colors.white01)};
  border-radius: 5px;
  margin: 43px;
  padding: 65px 45px;
  box-sizing: content-box;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`

const Title = styled.div`
  font-size: 40px;
  font-family: NotoSansSemiBold;
`;

const Edit = styled.div`
  margin: 65px 0;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-family: NotoSansSemiBold;
  font-size: 20px;
`;

const Desciption = styled.div`
  font-family: NotoSansSemiBold;
  font-size: 15px;
  color: ${({ theme }) => (theme.colors.subMain )};
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Input = styled.input`
  width: 600px;
  height: 46px;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => (theme.colors.white01 )};
  font-size: 20px;
  padding-left: 15px;
  box-sizing: border-box;
`;

const EmailDiv = styled.div`
  width: 600px;
  height: 46px;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => (theme.colors.white01 )};
  font-size: 20px;
  padding-left: 15px;
  box-sizing: border-box;
  color: #CDCDCD;
  display: flex;
  align-items: center;
`;

const SaveBtn = styled.button`
  width: 150px;
  height: 54px;
  color: #FFFFFF;
  background-color: ${({ theme }) => (theme.colors.subMain )};
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const BtnDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export default Account;