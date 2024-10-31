import styled from "styled-components";
import EnvPhrase from "./EnvPhrase";
import EnvRoomType from "./EvnRoomType";
import EnvCharacterList from "./EnvCharacterList";
import VoiceList from "components/studySetting/VoiceList";
import EnvGPTType from "./EnvGPTType";
import { useState } from "react";
import axios from "axios";
import { saveToken, getToken, removeToken } from "../../utils/localStroage";

const EnvSetting = () => {
  const [roomType, setRoomType] = useState("normal");
  const [voice, setVoice] = useState("voice1");
  const [assistantTone, setAssistantTone] = useState("default");
  const [cameraAccess, setCameraAccess] = useState(true);

  const handleSave = async () => {
    const token = getToken();
    const settingsData = {
      roomType,
      studyMate: {
        image:  "Noti",
        voice,
      },
      assistantTone,
      cameraAccess,
    };

    try {
      const response = await axios.post("http://localhost:8080/studyroom/default", settingsData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("설정이 저장되었습니다!");
      console.log("저장된 설정:", response.data);
    } catch (error) {
      console.error("설정 저장 중 오류 발생:", error);
      alert("설정 저장에 실패했습니다.");
    }
  };

  return (
    <Wrapper>
      <Conatiner>
        <Left>
          <EnvRoomType onSelect={(type) => setRoomType(type)}/>
          <EnvCharacterList />
          <VoiceList setStudyMateVoice={(selectedVoice) => setVoice(selectedVoice)}/>
          <EnvGPTType onSelectTone={(tone) => setAssistantTone(tone)}/>          
        </Left>
        <Right>
          <SaveBtn onClick={handleSave}>저장</SaveBtn>
        </Right>
      </Conatiner>
      <EnvPhrase />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 43px;
  gap: 20px;
`;

const Conatiner = styled.div`
  border: 2px solid ${({ theme }) => (theme.colors.white01)};
  border-radius: 5px;
  padding: 65px 45px;
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
const Right = styled.div``;

const SaveBtn = styled.button`
  width: 150px;
  height: 54px;
  color: #FFFFFF;
  background-color: ${({ theme }) => (theme.colors.subMain )};
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export default EnvSetting;