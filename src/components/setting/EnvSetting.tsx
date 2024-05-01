import styled from "styled-components";
import EnvPhrase from "./EnvPhrase";

const EnvSetting = () => {
  return (
    <Wrapper>
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


export default EnvSetting;