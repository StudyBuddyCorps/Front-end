import styled from "styled-components";
import { Voice } from "./Voice";

interface SoundPreviewProps {
  item: Voice;
}

const SoundPreview: React.FC<SoundPreviewProps> = ({ item }) => {
  return(
    <Wrapper>
      <ItemImg>
        <Img src={item.img} alt={item.name} />
      </ItemImg>
      <ItemName>{item.name}</ItemName>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  width: 150px;
  height: 150px;
  padding: 0 10px;
  box-sizing: border-box;
`;

const ItemImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1 / 1;  // 1:1 비율
  background-color: transparent;
  border: 2px solid #ECECEC;
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img`
  width: 60%;
`;

const ItemName = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

export default SoundPreview;