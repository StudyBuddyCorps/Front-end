import styled, { ThemeProvider } from "styled-components";
import theme from "styles/theme";

interface HeaderProps {
  title: string;
  dis?: string; // 선택적으로 전달
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>{props.title}</Title>
        <Phrase>{props.dis}</Phrase>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 100px);
  padding: 35px 43px;
  box-sizing: border-box;
  background-color: green;
`;

const Title = styled.div`
  font-family: InterExtraBold;
  font-size: 36px;
`;

const Phrase = styled.div`
  font-family: InterExtraBold;
  font-weight: 600;
  font-size: 20px;
  color: ${(props) => props.theme.colors.subMain};
`;

export default Header;
