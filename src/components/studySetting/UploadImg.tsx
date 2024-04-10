import React, { useState } from "react";
import styled from "styled-components";
import Upload from "../../assets/upload.png";


function UploadImg() {
  const [image, setImage] = useState<string | null>(null);

  {/* 이미지 선택 핸들러 */}
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  {/* 드래그 앤 드롭 핸들러 */}
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Wrapper
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {image ? (
        <UploadedImg src={image} alt="Uploaded Image" />
      ) : (
        <Label htmlFor="fileInput">
          <Img src={Upload} alt="Select Image" visible="true" />
          <Text visible="true">
            함께 공부하고 싶은<br />
            인물 사진을 업로드하세요
          </Text>
        </Label>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: calc(30vw* 0.7);
  background-color: #303237;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

const Img = styled.img<{ visible: string }>`
  width: 70px;
  cursor: pointer;
  display: ${(props) => props.visible === "true" ? "block" : "none"};
`;

const Text = styled.div<{ visible: string }>`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #FFFFFF;
  cursor: pointer;
  display: ${(props) => props.visible === "true" ? "block" : "none"};
`;

const UploadedImg = styled.img`
  position: absolute;
  bottom: 0;
`;

export default UploadImg;