import React from "react";
import styled from "styled-components";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  background?: string;
  children?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <StyledCard ref={ref} className={className} {...props}>
      {children}
    </StyledCard>
  )
);

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <StyledCardHeader ref={ref} className={className} {...props}>
      {children}
    </StyledCardHeader>
  )
);

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <StyledCardTitle ref={ref} className={className} {...props}>
      {children}
    </StyledCardTitle>
  )
);

// Styled components
const StyledCard = styled.div<CardProps>`
  background-color: ${(props) =>
    props.background || props.theme.colors.white01};
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  padding: 3rem;
`;

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCardTitle = styled.div`
  font-size: 1.5rem;
  font-family: NotoSansBold;
  color: ${({ theme }) => theme.colors.black03};
`;
