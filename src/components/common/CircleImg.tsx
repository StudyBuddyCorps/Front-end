import styled from "styled-components";

interface CircleImgProps {
  src: string;
  size: string;
}

export const CircleImg = styled.img<CircleImgProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  object-fit: cover;
  src: ${(props) => props.src};
`;

export default CircleImg;
