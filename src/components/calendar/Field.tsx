import React from "react";
import styled from "styled-components";

interface FieldProps {
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

const LayoutContainer = styled.div`
  background-color: #ececec33;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.white01};
  border-radius: 10px;
  padding: 20px;
`;

export default Field;
