import styled from "styled-components";
import Avatar from "../../assets/images/avatar_woman.png";
import Camera from "../../assets/images/camera.png";
import React, { useState, ChangeEvent } from "react";

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState<string>(Avatar);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setSelectedImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Wrapper>
      <Img src={selectedImage} alt="profile image" />
      <Edit>
        <img src={Camera} alt="edit profile" />
        <InputFile type="file" onChange={handleImageChange} accept="image/*" />
      </Edit>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

const Edit = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
`;

const InputFile = styled.input`
  display: none;
`;

export default EditProfile;