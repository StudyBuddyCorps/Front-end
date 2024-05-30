import { ReactNode } from "react";
import styled from "styled-components";

interface HeaderProps {
  imgSrc?: string; // 선택적으로 전달
  title: string;
  dis?: string; // 선택적으로 전달
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <Container>
      <LeftS>
        <Title>{props.title}</Title>
        <Phrase>{props.dis}</Phrase>
      </LeftS>
      <RightS>{props.children}</RightS>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 100px);
  padding: 35px 43px;
  box-sizing: border-box;
`;

const LeftS = styled.div``;
const RightS = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 30px;
`;

const Title = styled.div`
  font-family: NotoSansExtraBold;
  font-size: 36px;
`;

const Phrase = styled.div`
  font-family: NotoSansLight;
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.subMain};
`;

export default Header;
