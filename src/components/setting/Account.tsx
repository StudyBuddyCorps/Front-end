import styled from "styled-components";

const Account = () => {
  return (
    <Wrapper>
      <Title>
        안녕하세요, 홍길동 님
      </Title>

    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid ${({ theme }) => (theme.colors.white01)};
  border-radius: 5px;
  margin: 43px;
`;

const Title = styled.div`
  font-size: 40px;
`;

export default Account;