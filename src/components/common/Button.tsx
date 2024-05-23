import styled, { css } from "styled-components";
import theme from "styles/theme";

type ButtonProps = {
  width?: string;
  height?: string;
  backgroundColor?: string;
};

export const Button = styled.button<ButtonProps>`
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

type EnableButtonProps = {
  width?: string;
  height?: string;
  enabled: boolean;
};

export const EnableButton = styled.button<EnableButtonProps>`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "52px"};
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grey};
  color: ${({ theme }) => theme.colors.white02};
  font-size: 20px;
  font-family: NotoSansBold;
  cursor: not-allowed;
  ${(props) =>
    props.enabled &&
    css`
      background-color: #2a3f5f;
      cursor: pointer;
    `}
`;
