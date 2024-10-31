import styled from "styled-components";
import theme from "styles/theme";

interface ProgressBarProps {
  backgroundColor?: string;
  borderRadius?: number;
  height?: string;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor || theme.colors.white02};
  border-radius: ${({ borderRadius }) =>
    borderRadius || 50}px; // 기본 border-radius
  height: ${({ height }) => height || "2rem"};
  position: relative;
  overflow: hidden;
`;

interface FeedbackBoxProps {
  start: number;
  end: number;
  backgroundColor?: string;
}

export const FeedbackBox = styled.div<FeedbackBoxProps>`
  position: absolute;
  left: ${({ start }) => start}%;
  width: ${({ end, start }) => end - start}%;
  height: 100%;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || theme.colors.highlight};
  cursor: pointer;
  z-index: 1;
`;