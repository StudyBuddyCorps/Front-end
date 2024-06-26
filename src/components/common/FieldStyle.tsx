import styled from "styled-components";
import theme from "styles/theme";

type TextFieldProps = {
  width?: string;
  height?: string;
};

export const TextField = styled.input<TextFieldProps>`
  all: unset;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "50%"};
  border-radius: 5px;
  border: none;
  padding: 0px 15px;
  background-color: ${({ theme }) => theme.colors.white01};
  font-size: 20px;
  font-family: NotoSansRegular;
  &::placeholder {
    color: ${({ theme }) => theme.colors.grey2};
  }
  &:focus {
    outline: none;
  }
  line-height: 30px;
`;

type InputFieldProps = {
  width?: string;
  height?: string;
  borderColor?: string;
};

export const InputField = styled.input<InputFieldProps>`
  all: unset;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "53px"};
  border-radius: 5px;
  border: 2px solid ${(props) => props.borderColor || theme.colors.grey};
  box-sizing: border-box;
  padding: 0px 15px;
  background-color: ${({ theme }) => theme.colors.white02};
  font-size: 20px;
  font-family: NotoSansRegular;
  &::placeholder {
    color: ${({ theme }) => theme.colors.grey2};
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.subMain};
  }
`;
