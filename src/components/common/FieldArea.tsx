import React from "react";
import styled from "styled-components";

interface FieldAreaProps {
  title: string;
  desc?: string;
  children?: React.ReactNode;
}

const FieldArea: React.FC<FieldAreaProps> = ({
  title,
  desc,
  children,
}: FieldAreaProps) => {
  return (
    <Wrapper>
      <FieldTitle>{title}</FieldTitle>
      <FieldDesc>{desc}</FieldDesc>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3px;
`;

const FieldTitle = styled.div`
  font-family: NotoSansBold;
  color: ${({ theme }) => theme.colors.black00};
  font-size: 20px;
`;

const FieldDesc = styled.div`
  font-family: NotoSansMedium;
  color: ${({ theme }) => theme.colors.subMain};
  font-size: 15px;
  white-space: pre-line;
`;

export default FieldArea;
