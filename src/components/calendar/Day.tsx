import React from "react";
import styled from "styled-components";

interface DayProps {
  day: number;
  children?: React.ReactNode;
}

const Day: React.FC<DayProps> = (props: DayProps) => {
  return (
    <LayoutContainer>
      {props.day === 0 ? "" : props.day}
      {props.day === 0 ? "" : props.children}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;
`;

export default Day;
