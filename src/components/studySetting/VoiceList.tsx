import React, { useState } from "react";
import styled from "styled-components";
import SoundPreview from "./SoundPreview";
import OptionItem from "./OptionItem";
import { Voice } from "./Voice";
import { Character } from "./Character";
import Mute from "../../assets/sound_mute.png";

{/* 목소리 선택 임시 더미 데이터 */}
const voiceData: Voice[] = [
  { id: 1, name: 'man', img: require('../../assets/sound_man.png'), audio: require('../../assets/audio/Winner.mp3')},
  { id: 2, name: 'woman', img: require('../../assets/sound_woman.png'), audio: require('../../assets/audio/Winner.mp3')},
  { id: 3, name: 'boy', img: require('../../assets/sound_boy.png'), audio: require('../../assets/audio/Winner.mp3')}
];

const VoiceList: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [voicePreviewVisible, setVoicePreviewVisible] = useState<boolean>(false);
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);

  const handleVoiceClick = (item: Character | Voice) => { 
    if ('audio' in item) {
      const voice = item as Voice;
      if (!selectedVoice || selectedVoice.id !== voice.id) {
        setSelectedVoice(voice);
        setVoicePreviewVisible(true); // voicePreview를 보이도록 설정
        console.log('Selected Voice ID:', voice.id);

        // 새로운 오디오를 재생
        const newAudio = new Audio(voice.audio);
        setPlayingAudio(newAudio);
        newAudio.play();

        // 이전에 재생 중인 오디오를 정지
        if (playingAudio) {
          playingAudio.pause();
          playingAudio.currentTime = 0;
        }
      } else {
        setSelectedVoice(null);
        setVoicePreviewVisible(false); // voicePreview를 숨기도록 설정
        console.log('Cancelled Selection of Voice ID:', voice.id);

        // 선택이 취소된 경우 현재 재생 중인 오디오를 정지
        if (playingAudio) {
          playingAudio.pause();
          playingAudio.currentTime = 0;
        }
      }
    }
  };

  const handleSelectMuteClick = () => {
    setSelectedVoice(null); // 이미 선택된 음성 취소
    setVoicePreviewVisible(false); // voicePreview를 숨기도록 설정

    // 선택이 취소된 경우 현재 재생 중인 오디오를 정지
    if (playingAudio) {
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }
  };


  return (
    <div>      
      <Title>목소리 선택 <span>*</span></Title>

      <Container>
        <PreviewContainer voicePreviewVisible={voicePreviewVisible}>
          {voicePreviewVisible && selectedVoice && (
            <SoundPreview item={selectedVoice} />
          )}
        </PreviewContainer>

        {/* 스터디 메이트 목소리 선택 */}
        {voiceData.map(voice => (
          <OptionItem
            key={voice.id}
            item={voice}
            onClick={handleVoiceClick}
            selected={selectedVoice !== null && selectedVoice.id == voice.id}
          />
        ))}    

        <SelectMuteBox
          selected={selectedVoice === null}
          onClick={handleSelectMuteClick}
        >
          <img src={Mute} alt="Mute the sound." />
        </SelectMuteBox>  
      </Container>     
    </div>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: 22px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  
  span {
    color: #FF0000;
    font-size: 24px;
  }
`;

const PreviewContainer = styled.div<{ voicePreviewVisible: boolean }>`
  grid-column: 1 / span 2;
  ${({ voicePreviewVisible }) => voicePreviewVisible ? '' : 'display: none;'}
`;

const SelectMuteBox = styled.div<{ selected: boolean }>`
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ECECEC;
  border: 2px solid transparent;
  border-radius: 12px;

  ${({ selected }) => selected && `
    border-color: #586FC5;
  `}
`;

export default VoiceList;