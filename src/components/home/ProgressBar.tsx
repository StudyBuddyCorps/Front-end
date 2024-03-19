import React from "react";
import styled from "styled-components";

// ProgressBar의 props 타입 정의
interface ProgressBarProps {
  progress: number;  // progress 값 (0부터 100까지의 값)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const showLabel = progress > 5;  // 5% 이하인 경우에는 레이블을 표시하지 않음.
  
  return(
    <Wrapper>
      <ProgressIndicator progress={progress}>
        <ProgressLabel showLabel={showLabel}>{progress}%</ProgressLabel>
      </ProgressIndicator>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 830px;
  height: 28px;
  background-color: #FFFFFF;
  border: 1px solid #CDCDCD;
  border-radius: 50px;
  overflow: hidden;
`;

const ProgressIndicator = styled.div<ProgressBarProps>`
  width: ${(props) => props.progress}%;  // progress 값을 퍼센트로 변환하여 width로 설정
  height: 100%;
  background-color: rgb(255, 218, 88, 0.6);
  border: none;
  border-radius: 50px;
  position: absolute;
  top: 0;
  left: 0;
`;

const ProgressLabel = styled.div<{ showLabel: boolean}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(33, 46, 66, 0.6);
  visibility: ${(props) => (props.showLabel ? 'visible' : 'hidden')};  // 퍼센트 레이블의 가시성 설정
`;

export default ProgressBar;