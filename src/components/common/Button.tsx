import styled, { css } from "styled-components";
import theme from "styles/theme";

type ButtonProps = {
  width?: string;
  height?: string;
  backgroundColor?: string;
  onClick: () => void;
  children: React.ReactNode;
};

const Button = ({
  width,
  height,
  backgroundColor,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <ButtonStyle
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height || "50px"};
  color: ${({ theme }) => theme.colors.white02};
  background-color: ${(props) => props.backgroundColor || theme.colors.subMain};
  font-size: 20px;
  font-family: NotoSansMedium;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export default Button;
