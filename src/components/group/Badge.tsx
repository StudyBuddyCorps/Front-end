import React from "react";
import styled from "styled-components";

interface BadgeProps {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.span`
  background-color: ${({ theme, children }) =>
    children === "Owner" ? theme.colors.main : theme.colors.pink};
  text-align: center;
  line-height: 30px;
  width: 120px;
  height: 30px;
  border-radius: 10px;
  font-family: InterSemiBold;
`;

export default Badge;
