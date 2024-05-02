import styled from "styled-components";
import EnvPhrase from "./EnvPhrase";
import EnvRoomType from "./EvnRoomType";
import EnvCharacterList from "./EnvCharacterList";
import VoiceList from "components/studySetting/VoiceList";
import EnvGPTType from "./EnvGPTType";

const EnvSetting = () => {
  return (
    <Wrapper>
      <Conatiner>
        <EnvRoomType />
        <EnvCharacterList />
        <VoiceList />
        <EnvGPTType />
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
  flex-direction: column;
  gap: 50px;
`;

export default EnvSetting;