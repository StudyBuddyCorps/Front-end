import React, { useState } from "react";
import styled from "styled-components";
import CharacterList from "./CharacterList";

const StudyMate: React.FC = () => {
  return (
    <Wrapper>
      <CharacterList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 55vw;
  height: 88vh;
  background-color: #FFFFFF;
  border: none;
  border-radius: 0 15px 15px 0;
  padding: 84px 7%;
  box-sizing: border-box;
`;

export default StudyMate;