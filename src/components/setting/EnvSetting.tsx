import styled from "styled-components";
import EnvPhrase from "./EnvPhrase";
import EnvRoomType from "./EvnRoomType";
import EnvCharacterList from "./EnvCharacterList";
import VoiceList from "components/studySetting/VoiceList";
import EnvGPTType from "./EnvGPTType";

const EnvSetting = () => {
  const handleSave = () => {

  };

  return (
    <Wrapper>
      <Conatiner>
        <Left>
          <EnvRoomType />
          <EnvCharacterList />
          {/*<VoiceList />*/}
          <EnvGPTType />          
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