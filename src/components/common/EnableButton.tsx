import styled, { css } from "styled-components";

type EnableButtonProps = {
  width?: string;
  height?: string;
  enabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const EnableButton = ({
  width,
  height,
  enabled,
  onClick,
  children,
}: EnableButtonProps) => {
  return (
    <EnableButtonStyle
      width={width}
      height={height}
      enabled={enabled}
      onClick={onClick}
    >
      {children}
    </EnableButtonStyle>
  );
};

const EnableButtonStyle = styled.button<EnableButtonProps>`
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

export default EnableButton;
