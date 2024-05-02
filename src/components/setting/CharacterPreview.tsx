import React, { useState } from "react";
import styled from "styled-components";
import { Character } from "../studySetting/Character";

interface PreviewProps {
  item: Character | null;
}

const Preview: React.FC<PreviewProps> = ({ item }) => {
  return (
    <Wrapper>
      {item && <ItemImg src={item.large_img} alt={item.name} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 400px;
  height: 250px;
  background-color: transparent;
  border: 2px solid ${({ theme }) => (theme.colors.white01)};
  border-radius: 5px;
`;

const ItemImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  width: 380px;
  max-height: 240px;
`;

export default Preview;