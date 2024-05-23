import React from "react";
import styled from "styled-components";
import Stop from 'assets/images/Stop.png';
import Finish from 'assets/images/Finish.png';
import HeadPhone from 'assets/images/Headphones.png';
import { on } from "events";

interface ControlsProps {
  onPause: () => void;
  onStop: () => void;
  onWhiteNoise: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onPause, onStop, onWhiteNoise }) => {
  return (
    <Wrapper>
      <ButtonContainer>
        <ImgBtn src={Stop} alt="Pause" onClick={onPause} />
        일시정지
      </ButtonContainer>
      <ButtonContainer>
        <ImgBtn src={Finish} alt="End" onClick={onStop} />
        종료
      </ButtonContainer>
      <ButtonContainer>
        <ImgBtn src={HeadPhone} alt="white noise" onClick={onWhiteNoise} />
        백색 소음
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #FFFFFF;
  font-size: 16px;
  font-family: NotoSansSemiBold;
  align-items: center;
`;

const ImgBtn = styled.img`
  width: 60px;
  cursor: pointer;
`;

export default Controls;