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
      <SaveBtn onClick={handleSave}>저장</SaveBtn>
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

const SaveBtn = styled.button`
  width: 150px;
  height: 54px;
  color: #FFFFFF;
  background-color: #586FC5;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export default Account;