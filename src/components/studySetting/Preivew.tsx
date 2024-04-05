import React, { useState } from "react";
import styled from "styled-components";
import { Character } from "./Character";

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
  width: 100%;
  height: 50%;
  background-color: #303237;
  border: none;
  border-radius: 5px;
`;

const ItemImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
`;

export default Preview;