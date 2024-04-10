import React from 'react';
import styled, { css } from 'styled-components';

interface RadioProps {
  handleClickAdmin: (id: string) => void;
  selected: boolean;
  text: string;
  id: string;
}

const Radio: React.FC<RadioProps> = ({ handleClickAdmin, selected, text, id }) => {
  return (
    <ButtonBox>
      <AdminText>
        <NomalImg
          onClick={() => handleClickAdmin(id)}
          alt="nomalImg"
          src={require('../../assets/normal_radio.png')}
          selected={selected}
        />
        <ChangedImg
          onClick={() => handleClickAdmin(id)}
          alt="changedImg"
          src={require('../../assets/change_radio.png')}
          selected={selected}
        />
        {text}
      </AdminText>
    </ButtonBox>
  );
};

export default Radio;

const ButtonBox = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const AdminText = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  font-weight: 600;
  font-size: 24px;
`;

const ChangeImg = styled.img`
  margin: 0 8px 0 0;
  width: 20px;
  height: 20px;
  background-color: white;
`;

const sharedImgStyles = css`
  display: none;
`;

const NomalImg = styled(ChangeImg)<{ selected: boolean }>`
  ${sharedImgStyles}
  ${({ selected }) => !selected && css`
    display: block;
  `}
`;

const ChangedImg = styled(ChangeImg)<{ selected: boolean }>`
  ${sharedImgStyles}
  ${({ selected }) => selected && css`
    display: block;
  `}
`;
