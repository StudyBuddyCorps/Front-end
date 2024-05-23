import React, { useState, useEffect } from "react";
import styled from "styled-components";

// ProgressBar의 props 타입 정의
interface ProgressBarProps {
  progress: number; // progress 값 (0부터 100까지의 값)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const showLabel = progress > 5; // 5% 이하인 경우에는 레이블을 표시하지 않음.
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // You need to wrap it to trigger the animation
    requestAnimationFrame(() => {
      // Set a new array of percentage widths based on the props
      setWidth(progress);
    });
  }, [progress]);

  return (
    <Wrapper>
      <ProgressIndicator width={`${width}%`}>
        <ProgressLabel showLabel={showLabel}>{progress}%</ProgressLabel>
      </ProgressIndicator>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 30px;
  width: 65vw;
  background-color: #ffffff;
  border: 1px solid #cdcdcd;
  border-radius: 50px;
  overflow: hidden;
`;

const ProgressIndicator = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  transition: width 2s;
  height: 100%;
  background-color: rgb(255, 218, 88, 0.6);
  border: none;
  border-radius: 50px;
`;

const ProgressLabel = styled.div<{ showLabel: boolean }>`
  display: flex;
  justify-content:center;
  align-items: center;
  height: 100%;
  width: 100%
  transform: translate(-50%, -50%);
  color: rgb(33, 46, 66, 0.6);
  visibility: ${(props) =>
    props.showLabel ? "visible" : "hidden"}; // 퍼센트 레이블의 가시성 설정
`;

export default ProgressBar;
